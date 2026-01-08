import ChildCard from "../../components/ChildCard";
import AttendanceTable from "../../components/AttendanceTable";
import { useState, useEffect } from "react";

const DashboardParent = () => {
  const [children, setChildren] = useState([]);
  
  useEffect(() => {
    const fetchChildren = async () => {
      try { 
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/my-children', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });  
        const data = await response.json();
        setChildren(data.children || []);
      } catch (error) {
        console.error("Error fetching children data:", error);
      }
    };

    fetchChildren();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/attendance/my-children-attendance', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setData(data.attendance_records || []);
      } catch (error) {
        console.error("Error fetching attendance history:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="parent-dashboard">
      <div className="children-cards">
        {children.map((c) => (
          <ChildCard key={c.student_id} {...c} />
        ))}
      </div>

      <div className="attendance-history">
        <AttendanceTable data={data} />
      </div>
    </div>
  );
};

export default DashboardParent;
