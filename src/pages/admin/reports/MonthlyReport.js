import React from "react";
import { useState, useEffect } from "react";

const MonthlyReport = () => {
  const [report, setReport] = useState({
    total_students: 0,
    average_attendance_rate: "0%",
    total_present: 0,
    total_absent: 0
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/admin/monthly-attendance-report", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        setReport({
          total_students: data.total_students,
          average_attendance_rate: data.average_attendance_rate,
          total_present: data.total_present,
          total_absent: data.total_absent
        });
      } catch (error) {
        console.error("Error fetching monthly report data:", error);
      }
    };

    fetchReport();
  }, []);

  const reportData = [
    { title: "Total Students", value: report.total_students, color: "blue" },
    { title: "Average Attendance", value: report.average_attendance_rate, color: "yellow" },
    { title: "Present Days", value: report.total_present, color: "green" },
    { title: "Absent Days", value: report.total_absent, color: "red" }
  ];

  return (
    <div className="monthly-report-page">
      <div className="page-header">
        <h2>Monthly Attendance Report</h2>
        <p>Overview of student attendance this month</p>
      </div>

      <div className="report-cards-grid">
        <div className="report-card bg-blue">
          <h3>{report.total_students}</h3>
          <p>Total Students</p>
        </div>
        <div className="report-card bg-yellow">
          <h3>{((report.average_attendance_rate) * 100).toFixed(1)}%</h3>
          <p>Average Attendance</p>
        </div>
        <div className="report-card bg-green">
          <h3>{report.total_present}</h3>
          <p>Present</p>
        </div>
        <div className="report-card bg-red">
          <h3>{report.total_absent}</h3>
          <p>Absent</p>
        </div>
      </div>

      <div className="report-summary">
        <h3>Summary</h3>
        <ul>
          <li>span</li>
          <li><span className="badge present">Present: {report.total_present}</span></li>
          <li><span className="badge absent">Absent: {report.total_absent}</span></li>
          <li><span className="badge average">Average Attendance: {((report.average_attendance_rate) * 100).toFixed(1)}%</span></li>
        </ul>
      </div>
    </div>
  );
};

export default MonthlyReport;
