import AttendanceFeed from "../../../components/AttendanceFeed";
import { useState, useEffect, useRef } from "react";

const LiveAttendance = () => {
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [scanning, setScanning] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start webcam (same as enrollment)
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } else {
        alert("Camera not supported on this device.");
      }
    } catch (err) {
      alert("Unable to access camera");
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
    if (!videoRef.current) return;

    setScanning(true);

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 300, 300);
    const image = canvasRef.current.toDataURL("image/jpeg");

    try {
      const res = await fetch("http://localhost:5000/api/face/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();
      setStatusMessage(data);
      fetchAttendance();
    } catch (err) {
      console.error(err);
    }

    setScanning(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="live-attendance-page">
      <h2>Live Face Attendance</h2>

      <div className="live-attendance-grid">
        {/* LEFT PANEL (Same style as Face Enrollment) */}
        <div className="left-panel">
          <div className="instructions-card">
            <h3>How Attendance Works</h3>
            <ol>
              <li>Start camera</li>
              <li>Student looks into camera</li>
              <li>Align face inside guide</li>
              <li>Scan face</li>
              <li>Attendance marked automatically</li>
            </ol>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="form-card">
            {/* CAMERA SECTION */}
            <div className="camera-section">
              <video
                ref={videoRef}
                width="300"
                height="300"
                className="video-feed"
              />
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
              <button className="action-btn" onClick={startCamera}>
                Start Camera
              </button>
              <button className="action-btn" onClick={scanFace}>
                {scanning ? "Scanning..." : "Scan Face"}
              </button>
            </div>

            {/* SCAN RESULT */}
            {statusMessage && (
              <div className={`scan-result ${statusMessage.status?.toLowerCase()}`}>
                {statusMessage.status === "Present" && (
                  <p>✅ {statusMessage.student_name} marked present</p>
                )}
                {statusMessage.status === "Unknown" && (
                  <p>❌ Face not recognized</p>
                )}
                {statusMessage.status === "No face" && (
                  <p>⚠️ No face detected</p>
                )}
              </div>
            )}
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
