import StatCard from "../../components/StatCard";
import AttendanceFeed from "../../components/AttendanceFeed";

const Dashboard = () => {
  const stats = [
    { title: "Total Students", value: 120, color: "bg-blue", icon: "👨‍🎓" },
    { title: "Total Parents", value: 80, color: "bg-green", icon: "🧑‍👩‍👦" },
    { title: "Attendance Today", value: "95%", color: "bg-yellow", icon: "✅" },
  ];

  const recentAttendance = [
    { student: "John Doe", status: "Present", time: "08:30 AM" },
    { student: "Jane Smith", status: "Absent", time: "08:35 AM" },
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="attendance-section">
        <AttendanceFeed records={recentAttendance} />
      </div>
    </div>
  );
};

export default Dashboard;
