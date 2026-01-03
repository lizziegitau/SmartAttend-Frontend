import AttendanceTable from "../../../components/AttendanceTable";
import { useState, useEffect } from "react";

const AttendanceHistory = () => {
  const [data, setData] = useState([]);

  const [stats, setStats] = useState({
    total_students: 0,
    present_today: 0,
    absent_today: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/attendance/students");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/admin/stats", {
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

  return (
    <div className="attendance-history-page">
      <div className="page-header">
        <h2>Attendance History</h2>
        <p>Overview of student attendance records</p>
      </div>

      <div className="summary-cards">
        <div className="summary-card total">
          <span>Total Students</span>
          <h3>{stats.total_students ?? 0}</h3>
        </div>
        <div className="summary-card present">
          <span>Present Today</span>
          <h3>{stats.present_today ?? 0}</h3>
        </div>
        <div className="summary-card absent">
          <span>Absent Today</span>
          <h3>{stats.absent_today ?? 0}</h3>
        </div>
      </div>

      <div className="table-card">
        <AttendanceTable data={data} />
      </div>
    </div>
  );
};

export default AttendanceHistory;
