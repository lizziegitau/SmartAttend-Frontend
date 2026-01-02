const AttendanceFeed = ({ records = [] }) => {
  return (
    <div className="attendance-feed">
      <div className="feed-header">
        <h3>Recent Attendance</h3>
        <span className="feed-subtitle">Latest check-ins</span>
      </div>

      {records.length === 0 ? (
        <p className="feed-empty">No attendance records yet</p>
      ) : (
        records.map((r, i) => (
          <div key={i} className="feed-item">
            <div className="feed-left">
              <span className="student-name">{r.student}</span>
              <span className="feed-time">{r.time}</span>
            </div>

            <span
              className={`status-badge ${
                r.status === 'Present' ? 'present' : 'absent'
              }`}
            >
              {r.status}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export default AttendanceFeed
