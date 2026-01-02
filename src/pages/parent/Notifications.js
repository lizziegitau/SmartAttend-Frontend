const Notifications = () => {
  const notifications = [
    { message: "John Doe was absent today.", type: "alert" },
    { message: "New report published: December Attendance", type: "info" },
    { message: "Jane Smith checked in late today.", type: "alert" },
    { message: "System maintenance scheduled for 10 PM", type: "info" },
  ];

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <h2>Notifications</h2>
        <div className="notifications-card">
          {notifications.length === 0 ? (
            <p className="empty-notifications">No new notifications</p>
          ) : (
            <ul className="notifications-list">
              {notifications.map((n, i) => (
                <li key={i} className={`notification-item ${n.type}`}>
                  <div className="left">
                    <span className={`dot ${n.type}`} />
                    <span className="message">{n.message}</span>
                  </div>
                  <span className="time">just now</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
