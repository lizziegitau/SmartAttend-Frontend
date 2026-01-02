const ChildCard = ({ name, regNo, attendancePercent }) => {
  const attendanceLevel =
    attendancePercent >= 80
      ? 'good'
      : attendancePercent >= 60
      ? 'average'
      : 'poor'

  return (
    <div className="child-card">
      <div className="child-card-header">
        <h3 className="child-name">{name}</h3>
        <span className={`attendance-badge ${attendanceLevel}`}>
          {attendancePercent}%
        </span>
      </div>

      <div className="child-card-body">
        <div className="info-row">
          <span className="label">Registration No</span>
          <span className="value">{regNo}</span>
        </div>

        <div className="info-row">
          <span className="label">Attendance Rate</span>
          <span className={`value ${attendanceLevel}`}>
            {attendancePercent}% ({attendanceLevel})
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChildCard
