import AttendanceTable from "../../../components/AttendanceTable";

const ViewStudents = () => {
  const students = [
    { name: "John Doe", regNo: "STD001", date: "2025-12-28", status: "Present" },
    { name: "Jane Smith", regNo: "STD002", date: "2025-12-28", status: "Absent" },
    { name: "Mark Lee", regNo: "STD003", date: "2025-12-28", status: "Present" },
  ];

  return (
    <div>
      <h2>View Students</h2>
      <AttendanceTable data={students} />
    </div>
  );
};

export default ViewStudents;
