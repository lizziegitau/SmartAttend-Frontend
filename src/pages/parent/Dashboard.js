import ChildCard from "../../components/ChildCard";
import AttendanceTable from "../../components/AttendanceTable";

const DashboardParent = () => {
  const children = [
    { name: "John Doe", regNo: "STD123", attendancePercent: 95 },
    { name: "Jane Doe", regNo: "STD124", attendancePercent: 88 },
  ];

  const attendanceHistory = [
    { name: "John Doe", regNo: "STD123", date: "2025-12-28", status: "Present" },
    { name: "Jane Doe", regNo: "STD124", date: "2025-12-28", status: "Absent" },
  ];

  return (
    <div className="parent-dashboard">
      <div className="children-cards">
        {children.map((c, i) => (
          <ChildCard key={i} {...c} />
        ))}
      </div>

      <div className="attendance-history">
        <AttendanceTable data={attendanceHistory} />
      </div>
    </div>
  );
};

export default DashboardParent;
