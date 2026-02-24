import { formatDate } from '../utils/dateUtils';

const AttendanceFeed = ({ records = [] }) => {

  const recordsArray = Array.isArray(records) ? records : [];

  return (
    <div className="attendance-feed">
      <div className="feed-header">
        <h3>Recent Attendance</h3>
        <span className="feed-subtitle">Latest check-ins</span>
      </div>

      {recordsArray.length === 0 ? (
        <p className="feed-empty">No attendance records yet</p>
      ) : (
        recordsArray.map((r, i) => (
          <div key={i} className="feed-item">
            <div className="feed-left">
              <span className="student-name">{r.student_name}</span>
              <span className="feed-time">{formatDate(r.created_at)}</span>
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
