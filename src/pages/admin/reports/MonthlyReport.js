import React from "react";

const MonthlyReport = () => {
  const reportData = [
    { title: "Total Students", value: 120, color: "blue" },
    { title: "Average Attendance", value: "92%", color: "green" },
    { title: "Present Days", value: 3300, color: "yellow" },
    { title: "Absent Days", value: 300, color: "red" },
  ];

  return (
    <div className="monthly-report-page">
      <div className="page-header">
        <h2>Monthly Attendance Report</h2>
        <p>Overview of student attendance this month</p>
      </div>

      <div className="report-cards-grid">
        {reportData.map((item, index) => (
          <div key={index} className={`report-card bg-${item.color}`}>
            <div className="card-info">
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="report-summary">
        <h3>Summary</h3>
        <ul>
          <li><span className="badge present">Present: 110</span></li>
          <li><span className="badge absent">Absent: 10</span></li>
          <li><span className="badge average">Average Attendance: 92%</span></li>
        </ul>
      </div>
    </div>
  );
};

export default MonthlyReport;
