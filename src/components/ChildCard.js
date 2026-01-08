const ChildCard = ({ full_name, registration_number, attendance_rate }) => {
  const rate = parseFloat(attendance_rate) || 0; // convert string to number
  const attendanceLevel =
    rate >= 80
      ? 'good'
      : rate >= 60
      ? 'average'
      : 'poor';

  return (
    <div className="child-card">
      <div className="child-card-header">
        <h3 className="child-name">{full_name}</h3>
        <span className={`attendance-badge ${attendanceLevel}`}>
          {rate}%
        </span>
      </div>

      <div className="child-card-body">
        <div className="info-row">
          <span className="label">Registration No</span>
          <span className="value">{registration_number}</span>
        </div>

        <div className="info-row">
          <span className="label">Attendance Rate</span>
          <span className={`value ${attendanceLevel}`}>
            {rate}% ({attendanceLevel})
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChildCard;
