const AttendanceTable = ({ data = [] }) => {
  return (
    <div className="attendance-table-wrapper">
      <div className="table-header">
        <h3>Attendance Records</h3>
        <span className="table-subtitle">Student attendance overview</span>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Reg No</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="table-empty">
                No attendance data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                <td className="student-cell">{row.name}</td>
                <td className="reg-cell">{row.regNo}</td>
                <td className="date-cell">{row.date}</td>
                <td>
                  <span
                    className={`status-pill ${
                      row.status === 'Present' ? 'present' : 'absent'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceTable
