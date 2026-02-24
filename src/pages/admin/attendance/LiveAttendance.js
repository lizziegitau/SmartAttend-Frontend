import AttendanceFeed from "../../../components/AttendanceFeed";
import { useState, useEffect, useRef } from "react";

const LiveAttendance = () => {
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start webcam
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
        setIsCameraActive(true);
        setStatusMessage({ type: 'success', text: 'Camera started - ready to scan' });
      } else {
        setStatusMessage({ type: 'error', text: 'Camera not supported on this device' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Unable to access camera' });
      console.error(err);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
      setStatusMessage(null);
    }
  };

  // Fetch attendance feed
  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/attendance/students");
      const data = await response.json();
      setRecentAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Capture face & mark attendance
  const scanFace = async () => {
    if (!videoRef.current || !isCameraActive) {
      setStatusMessage({ type: 'error', text: 'Please start camera first' });
      return;
    }

    setScanning(true);
    setStatusMessage({ type: 'info', text: 'Scanning face...' });
    setRecognitionResult(null);

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const image = canvasRef.current.toDataURL("image/jpeg");

    try {
      const res = await fetch("http://localhost:5000/api/face/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();
      
      // Update UI based on response
      if (data.status === "Present") {
        setStatusMessage({ 
          type: 'success', 
          text: `✅ ${data.student_name} recognized (${data.confidence}% confidence)` 
        });
        setRecognitionResult(data);
        
        // Refresh attendance feed
        fetchAttendance();
        
        // Clear result after 5 seconds
        setTimeout(() => {
          setRecognitionResult(null);
        }, 5000);
      } 
      else if (data.status === "Unknown") {
        setStatusMessage({ 
          type: 'error', 
          text: '❌ Face not recognized - student may not be enrolled' 
        });
      } 
      else if (data.status === "No face") {
        setStatusMessage({ 
          type: 'warning', 
          text: '⚠️ No face detected - please position face clearly' 
        });
      }
      else {
        setStatusMessage({ 
          type: 'error', 
          text: data.message || 'Recognition failed' 
        });
      }

    } catch (err) {
      console.error(err);
      setStatusMessage({ 
        type: 'error', 
        text: 'Network error - please check connection' 
      });
    }

    setScanning(false);
  };

  useEffect(() => {
    fetchAttendance();
    
    // Refresh attendance every 10 seconds
    const interval = setInterval(fetchAttendance, 10000);
    
    return () => {
      clearInterval(interval);
      stopCamera(); // Cleanup camera on unmount
    };
  }, []);

  return (
    <div className="live-attendance-page">
      <h2>Live Face Attendance</h2>

      <div className="live-attendance-grid">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="instructions-card">
            <h3>How Attendance Works</h3>
            <ol>
              <li>Start camera</li>
              <li>Student looks into camera</li>
              <li>Align face inside guide</li>
              <li>Click "Scan Face"</li>
              <li>Attendance marked automatically</li>
              <li>Parent receives email notification</li>
            </ol>
            
            <div style={{ marginTop: '20px', padding: '10px', background: '#f0f9ff', borderRadius: '6px' }}>
              <strong>ℹ️ System Status:</strong>
              <ul style={{ fontSize: '13px', marginTop: '8px' }}>
                <li>Camera: {isCameraActive ? '🟢 Active' : '🔴 Inactive'}</li>
                <li>AI Model: 🟢 Ready</li>
                <li>Auto-refresh: Every 10s</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="form-card">
            {/* Status Message */}
            {statusMessage && (
              <div className={`status-message ${statusMessage.type}`}>
                {statusMessage.text}
              </div>
            )}

            {/* Recognition Result Card */}
            {recognitionResult && recognitionResult.status === "Present" && (
              <div className="recognition-result">
                <h3>✅ Student Recognized</h3>
                <div className="student-details">
                  <p><strong>Name:</strong> {recognitionResult.student_name}</p>
                  <p><strong>Reg No:</strong> {recognitionResult.registration_number}</p>
                  <p><strong>Grade:</strong> {recognitionResult.grade}</p>
                  <p><strong>Confidence:</strong> {recognitionResult.confidence}%</p>
                  <p><strong>Status:</strong> {recognitionResult.message}</p>
                  {recognitionResult.parent_notified && (
                    <p className="email-status">📧 Parent notified via email</p>
                  )}
                </div>
              </div>
            )}

            {/* CAMERA SECTION */}
            <div className="camera-section">
              <video
                ref={videoRef}
                width="300"
                height="300"
                className="video-feed"
                style={{ display: isCameraActive ? 'block' : 'none' }}
              />
              {!isCameraActive && (
                <div className="camera-placeholder">
                  <p>📷 Camera not active</p>
                  <p style={{ fontSize: '12px', color: '#666' }}>Click "Start Camera" to begin</p>
                </div>
              )}
              <div className="face-guide"></div>
              <canvas
                ref={canvasRef}
                width="300"
                height="300"
                style={{ display: "none" }}
              />
            </div>

            {/* CAMERA BUTTONS */}
            <div className="camera-buttons">
              {!isCameraActive ? (
                <button 
                  className="action-btn" 
                  onClick={startCamera}
                >
                  Start Camera
                </button>
              ) : (
                <>
                  <button 
                    className="action-btn" 
                    onClick={scanFace}
                    disabled={scanning}
                  >
                    {scanning ? "Scanning..." : "Scan Face"}
                  </button>
                  <button 
                    className="action-btn secondary" 
                    onClick={stopCamera}
                    disabled={scanning}
                  >
                    Stop Camera
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FEED */}
        <div className="feed-card">
          <AttendanceFeed records={recentAttendance} />
        </div>
      </div>
    </div>
  );
};

export default LiveAttendance;