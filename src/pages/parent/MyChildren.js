import ChildCard from "../../components/ChildCard";
import { useState, useEffect } from "react";


const MyChildren = () => {
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

  

  return (
    <div>
      <h2>My Children</h2>
      <div className="children-cards">
        {children.map((c) => (
          <ChildCard key={c.student_id} {...c} />
        ))}
      </div>
    </div>
  );
};

export default MyChildren;
