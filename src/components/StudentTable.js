import { formatDate } from "../utils/dateUtils"

const StudentTable = ({ data = [] }) => {
  return (
    <div className="attendance-table-wrapper">
      
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Reg No</th>
            <th>Grade</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>      
              <td colSpan="4" className="table-empty">
                No student data available
              </td>
            </tr>
          ) : (   
            data.map((student, i) => (
              <tr key={i}>
                <td className="student-cell">{student.full_name}</td>
                <td className="reg-cell">{student.registration_number}</td>
                <td className="grade-cell">{student.grade}</td>
                <td className="date-cell">{formatDate(student.created_at)}</td>
              </tr>
            ))
          )}  
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
