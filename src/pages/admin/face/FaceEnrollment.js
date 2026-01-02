import { useState, useRef } from "react";

const FaceEnrollment = () => {
  const [studentName, setStudentName] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start webcam
  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } else {
      alert("Camera not supported on this device.");
    }
  };

  // Capture image from webcam
  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 300);
    const imageData = canvasRef.current.toDataURL("image/png");
    setCapturedImage(imageData);
  };

  const handleEnroll = () => {
    if (!studentName || !capturedImage) {
      alert("Please enter student name and capture photo.");
      return;
    }
    console.log("Enrolling student:", studentName);
    console.log("Image Data:", capturedImage);
    alert(`Student ${studentName} enrolled successfully!`);
  };

  // Dummy recent enrollments
  const recentEnrollments = [
    { name: "John Doe", image: "https://i.pravatar.cc/40?img=1" },
    { name: "Jane Smith", image: "https://i.pravatar.cc/40?img=2" },
    { name: "Mark Lee", image: "https://i.pravatar.cc/40?img=3" },
  ];

  return (
    <div className="face-enroll-page">
      <h2>Face Enrollment</h2>

      <div className="face-enroll-grid">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="instructions-card">
            <h3>Steps to Enroll</h3>
            <ol>
              <li>Enter full name</li>
              <li>Start camera</li>
              <li>Position face inside guide</li>
              <li>Capture photo</li>
              <li>Click Enroll</li>
            </ol>
          </div>

          <div className="recent-enrollments">
            <h3>Recent Enrollments</h3>
            <ul>
              {recentEnrollments.map((student, i) => (
                <li key={i} className="recent-item">
                  <img src={student.image} alt={student.name} />
                  <span>{student.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="form-card">
            <div className="input-group">
              <label>Student Full Name</label>
              <input
                type="text"
                placeholder="Enter student full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="camera-section">
              <video ref={videoRef} width="300" height="300" className="video-feed" />
              <div className="face-guide"></div>
              <canvas ref={canvasRef} width="300" height="300" style={{ display: "none" }} />
            </div>

            <div className="camera-buttons">
              <button className="action-btn" onClick={startCamera}>
                Start Camera
              </button>
              <button className="action-btn" onClick={capturePhoto}>
                Capture Photo
              </button>
            </div>

            {capturedImage && (
              <div className="preview-section">
                <h3>Captured Photo</h3>
                <img src={capturedImage} alt="Captured Face" className="captured-image" />
              </div>
            )}

            <button className="submit-btn" onClick={handleEnroll}>
              Enroll Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceEnrollment;
