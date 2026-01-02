import { useState } from "react";

const RegisterStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    regNo: "",
    grade: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Student:", student);
    alert("Student registered successfully!");
  };

  return (
    <div className="form-page">
      <h2>Register Student</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Registration Number</label>
          <input
            type="text"
            name="regNo"
            value={student.regNo}
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

        <button type="submit" className="submit-btn">
          Register Student
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
