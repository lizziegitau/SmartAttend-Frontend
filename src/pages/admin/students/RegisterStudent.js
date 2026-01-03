import { useState, useEffect } from "react";

const RegisterStudent = () => {
  const [student, setStudent] = useState({
    full_name: "",
    registration_number: "",
    grade: "",
    parent_id: ""
  });

  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch parents for admin
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/users/parents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setParents(data);
      } catch (error) {
        console.error("Failed to fetch parents:", error);
      }
    };

    fetchParents();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/students/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(student),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register student");
      }

      alert("Student registered successfully!");

      // Reset form
      setStudent({
        full_name: "",
        registration_number: "",
        grade: "",
        parent_id: ""
      });
    } catch (error) {
      console.error("Register student error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h2>Register Student</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={student.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Registration Number</label>
          <input
            type="text"
            name="registration_number"
            value={student.registration_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Grade/Class</label>
          <input
            type="text"
            name="grade"
            value={student.grade}
            onChange={handleChange}
            required
          />
        </div>

        {/* Parent dropdown for admin */}
        <div className="input-group">
          <label>Parent</label>
          <select
            name="parent_id"
            value={student.parent_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registering..." : "Register Student"}
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
