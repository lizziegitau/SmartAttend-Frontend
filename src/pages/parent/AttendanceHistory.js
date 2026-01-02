import AttendanceTable from "../../components/AttendanceTable";

const AttendanceHistory = () => {
  const data = [
    { name: "John Doe", regNo: "STD001", date: "2025-12-28", status: "Present" },
    { name: "Jane Smith", regNo: "STD002", date: "2025-12-28", status: "Absent" },
  ];

  return (
    <div>
      <h2>Attendance History</h2>
      <AttendanceTable data={data} />
    </div>
  );
};

export default AttendanceHistory;
