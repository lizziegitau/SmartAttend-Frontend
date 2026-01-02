import AttendanceTable from "../../../components/AttendanceTable";

const AttendanceHistory = () => {
  const data = [
    { name: "John Doe", regNo: "STD001", date: "2025-12-28", status: "Present" },
    { name: "Jane Smith", regNo: "STD002", date: "2025-12-28", status: "Absent" },
    { name: "Mark Lee", regNo: "STD003", date: "2025-12-28", status: "Present" },
  ];

  const summary = {
    total: data.length,
    present: data.filter(d => d.status === "Present").length,
    absent: data.filter(d => d.status === "Absent").length,
  };

  return (
    <div className="attendance-history-page">
      <div className="page-header">
        <h2>Attendance History</h2>
        <p>Overview of student attendance records</p>
      </div>

      {/* Summary cards */}
      <div className="summary-cards">
        <div className="summary-card total">
          <span>Total Students</span>
          <h3>{summary.total}</h3>
        </div>
        <div className="summary-card present">
          <span>Present Today</span>
          <h3>{summary.present}</h3>
        </div>
        <div className="summary-card absent">
          <span>Absent Today</span>
          <h3>{summary.absent}</h3>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="table-card">
        <AttendanceTable data={data} />
      </div>
    </div>
  );
};

export default AttendanceHistory;
