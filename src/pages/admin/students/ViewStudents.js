import StudentTable from "../../../components/StudentTable";
import { useState, useEffect } from "react";


const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>View Students</h2>
      <StudentTable data={students} />
    </div>
  );
};

export default ViewStudents;
