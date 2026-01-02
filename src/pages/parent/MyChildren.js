import ChildCard from "../../components/ChildCard";

const MyChildren = () => {
  const children = [
    { name: "John Doe", regNo: "STD001", attendancePercent: 95 },
    { name: "Jane Smith", regNo: "STD002", attendancePercent: 88 },
  ];

  return (
    <div>
      <h2>My Children</h2>
      <div className="children-grid">
        {children.map((c, i) => (
          <ChildCard key={i} {...c} />
        ))}
      </div>
    </div>
  );
};

export default MyChildren;
