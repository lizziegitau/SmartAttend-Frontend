import StatCard from "../../components/StatCard";
import AttendanceFeed from "../../components/AttendanceFeed";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_students: 0,
    total_parents: 0,
    attendance_percentage_today: 0
});

  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });  
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);


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

  const statCards = [
    {
      title: "Total Students",
      value: stats.total_students,
      color: "bg-blue",
      icon: "👨‍🎓"
    },
    {
      title: "Total Parents",
      value: stats.total_parents,
      color: "bg-green",
      icon: "🧑‍👩‍👦"
    },
    {
      title: "Attendance Today",
      value: `${stats.attendance_percentage_today}%`,
      color: "bg-yellow",
      icon: "✅"
    }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {statCards.map((s, i) => (
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
