import AttendanceTable from "../../components/AttendanceTable";
import { useState, useEffect } from "react";

const AttendanceHistory = () => {
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
    <div>
      <h2>Attendance History</h2>
      <AttendanceTable data={data} />
    </div>
  );
};

export default AttendanceHistory;
