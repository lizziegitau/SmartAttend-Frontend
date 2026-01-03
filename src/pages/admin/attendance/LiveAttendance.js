import AttendanceFeed from "../../../components/AttendanceFeed";
import { useState, useEffect } from "react";

const LiveAttendance = () => {
  const [recentAttendance, setRecentAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/attendance/students');
        const data = await response.json();
        setRecentAttendance(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);


  
  return (
    <div className="live-attendance-page">
      <div className="page-header">
        <h2>Live Attendance</h2>
        <p>Track students marking attendance in real time</p>
      </div>

      <div className="feed-card">
        <AttendanceFeed records={recentAttendance} />
      </div>
    </div>
  );
}

export default LiveAttendance;
