import React from "react";

const DailyReport = () => {
  const report = {
    total: 120,
    present: 110,
    absent: 10,
  };

  return (
    <div className="daily-report-page">
      <div className="page-header">
        <h2>Daily Attendance Report</h2>
        <p>Quick overview of today's attendance</p>
      </div>

      <div className="stats-grid">
        <div className="report-card bg-blue">
          <h3>{report.total}</h3>
          <p>Total Students</p>
        </div>
        <div className="report-card bg-green">
          <h3>{report.present}</h3>
          <p>Present</p>
        </div>
        <div className="report-card bg-red">
          <h3>{report.absent}</h3>
          <p>Absent</p>
        </div>
      </div>

      <div className="report-summary">
        <h3>Summary</h3>
        <ul>
          <li><span className="badge present">Present: {report.present}</span></li>
          <li><span className="badge absent">Absent: {report.absent}</span></li>
          <li><span className="badge average">
            Attendance Rate: {((report.present / report.total) * 100).toFixed(1)}%
          </span></li>
        </ul>
      </div>
    </div>
  );
};

export default DailyReport;
