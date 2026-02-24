import { useState, useRef, useEffect } from "react";

const FaceEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [capturedImages, setCapturedImages] = useState([]);
  const [enrolling, setEnrolling] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Fetch students without face enrollment
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    return () => {
      stopCamera(); // Cleanup on unmount
    };
  }, []);

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
        setStatusMessage({ type: 'success', text: 'Camera started' });
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
    }
  };

  // Capture image from webcam
  const capturePhoto = () => {
    if (!videoRef.current || capturedImages.length >= 5) return;

    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const imageData = canvasRef.current.toDataURL("image/jpeg");
    setCapturedImages([...capturedImages, imageData]);
    
    setStatusMessage({ 
      type: 'success', 
      text: `Photo ${capturedImages.length + 1}/5 captured` 
    });
  };

  // Clear captured images
  const clearImages = () => {
    setCapturedImages([]);
    setStatusMessage(null);
  };

  // Handle enrollment
  const handleEnroll = async () => {
    if (!selectedStudent) {
      setStatusMessage({ type: 'error', text: 'Please select a student' });
      return;
    }

    if (capturedImages.length < 1) {
      setStatusMessage({ type: 'error', text: 'Please capture at least 1 photo' });
      return;
    }

    setEnrolling(true);
    setStatusMessage({ type: 'info', text: 'Processing face data...' });

    try {
      const response = await fetch("http://localhost:5000/api/face/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: selectedStudent,
          images: capturedImages
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage({ 
          type: 'success', 
          text: `✅ ${data.student_name} enrolled successfully! (${data.images_processed} images processed)` 
        });
        
        // Reset form
        setCapturedImages([]);
        setSelectedStudent("");
        stopCamera();
        fetchStudents(); // Refresh student list
        
        setTimeout(() => setStatusMessage(null), 5000);
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'Enrollment failed' });
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      setStatusMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="face-enroll-page">
      <h2>Face Enrollment</h2>

      <div className="face-enroll-grid">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="instructions-card">
            <h3>Steps to Enroll</h3>
            <ol>
              <li>Select student from dropdown</li>
              <li>Start camera</li>
              <li>Position face inside guide</li>
              <li>Capture 1-5 photos (different angles)</li>
              <li>Click "Enroll Student"</li>
            </ol>
            <div style={{ marginTop: '20px', padding: '10px', background: '#f0f9ff', borderRadius: '6px' }}>
              <strong>💡 Tips:</strong>
              <ul style={{ fontSize: '13px', marginTop: '8px' }}>
                <li>Ensure good lighting</li>
                <li>Face should be clearly visible</li>
                <li>Capture from different angles</li>
                <li>More photos = better accuracy</li>
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

            {/* Student Selection */}
            <div className="input-group">
              <label>Select Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                disabled={enrolling}
              >
                <option value="">-- Choose Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} ({student.registration_number})
                  </option>
                ))}
              </select>
            </div>

            {/* Camera Section */}
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

            {/* Camera Buttons */}
            <div className="camera-buttons">
              {!isCameraActive ? (
                <button 
                  className="action-btn" 
                  onClick={startCamera}
                  disabled={enrolling}
                >
                  Start Camera
                </button>
              ) : (
                <>
                  <button 
                    className="action-btn" 
                    onClick={capturePhoto}
                    disabled={enrolling || capturedImages.length >= 5}
                  >
                    Capture Photo ({capturedImages.length}/5)
                  </button>
                  <button 
                    className="action-btn secondary" 
                    onClick={stopCamera}
                    disabled={enrolling}
                  >
                    Stop Camera
                  </button>
                </>
              )}
            </div>

            {/* Captured Images Preview */}
            {capturedImages.length > 0 && (
              <div className="preview-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Captured Photos ({capturedImages.length})</h3>
                  <button 
                    onClick={clearImages} 
                    className="clear-btn"
                    disabled={enrolling}
                  >
                    Clear All
                  </button>
                </div>
                <div className="images-grid">
                  {capturedImages.map((img, index) => (
                    <div key={index} className="captured-image-wrapper">
                      <img 
                        src={img} 
                        alt={`Capture ${index + 1}`} 
                        className="captured-image" 
                      />
                      <span className="image-number">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enroll Button */}
            <button 
              className="submit-btn" 
              onClick={handleEnroll}
              disabled={enrolling || !selectedStudent || capturedImages.length === 0}
            >
              {enrolling ? 'Enrolling...' : 'Enroll Student'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceEnrollment;