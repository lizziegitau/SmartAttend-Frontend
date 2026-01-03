import React from "react";
import { useState, useEffect } from "react";


const DailyReport = () => {
  const [report, setReport] = useState({
    total_students: 0,
    present_today: 0,
    absent_today: 0
  });
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/admin/attendance-overview", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        setReport({
          total_students: data.total_students,
          present_today: data.present_today,
          absent_today: data.absent_today
        });
      } catch (error) {
        console.error("Error fetching daily report data:", error);
      }   
    };

    fetchReport();
  }, []); 


  return (
    <div className="daily-report-page">
      <div className="page-header">
        <h2>Daily Attendance Report</h2>
        <p>Quick overview of today's attendance</p>
      </div>

      <div className="stats-grid">
        <div className="report-card bg-blue">
          <h3>{report.total_students}</h3>
          <p>Total Students</p>
        </div>
        <div className="report-card bg-green">
          <h3>{report.present_today}</h3>
          <p>Present</p>
        </div>
        <div className="report-card bg-red">
          <h3>{report.absent_today}</h3>
          <p>Absent</p>
        </div>
      </div>

      <div className="report-summary">
        <h3>Summary</h3>
        <ul>
          <li><span className="badge present">Present: {report.present_today}</span></li>
          <li><span className="badge absent">Absent: {report.absent_today}</span></li>
          <li><span className="badge average">
            Attendance Rate: {((report.present_today / report.total_students) * 100).toFixed(1)}%
          </span></li>
        </ul>
      </div>
    </div>
  );
};

export default DailyReport;
