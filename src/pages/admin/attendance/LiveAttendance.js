import AttendanceFeed from "../../../components/AttendanceFeed";

const LiveAttendance = () => {
  const recentAttendance = [
    { student: "John Doe", status: "Present", time: "08:30 AM" },
    { student: "Jane Smith", status: "Absent", time: "08:35 AM" },
    { student: "Mark Lee", status: "Present", time: "08:40 AM" },
  ];

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
};

export default LiveAttendance;
