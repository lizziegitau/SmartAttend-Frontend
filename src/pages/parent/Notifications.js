import { useState, useEffect, useCallback } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user email from localStorage (assuming you store it after login)
  const getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email || null;
  };

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    const userEmail = getUserEmail();
    
    if (!userEmail) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/notifications/user/${userEmail}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/notifications/read/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update local state
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  // Get notification type styling
  const getNotificationType = (type) => {
    const types = {
      'arrival': 'info',
      'departure': 'info',
      'absence': 'alert',
      'custom': 'info'
    };
    return types[type] || 'info';
  };

  useEffect(() => {
    fetchNotifications();

    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div className="notifications-page">
        <div className="notifications-container">
          <h2>Notifications</h2>
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-page">
        <div className="notifications-container">
          <h2>Notifications</h2>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Notifications</h2>
          <button 
            className="refresh-btn" 
            onClick={fetchNotifications}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            🔄 Refresh
          </button>
        </div>

        <div className="notifications-card">
          {notifications.length === 0 ? (
            <p className="empty-notifications">No notifications yet</p>
          ) : (
            <ul className="notifications-list">
              {notifications.map((n) => (
                <li 
                  key={n.id} 
                  className={`notification-item ${getNotificationType(n.type)} ${n.is_read ? 'read' : 'unread'}`}
                  onClick={() => !n.is_read && markAsRead(n.id)}
                  style={{ cursor: n.is_read ? 'default' : 'pointer' }}
                >
                  <div className="left">
                    <span className={`dot ${getNotificationType(n.type)}`} />
                    <div>
                      <span className="message">
                        {n.type === 'arrival' && `✅ ${n.child_name} arrived at school`}
                        {n.type === 'departure' && `🚪 ${n.child_name} left school`}
                        {n.type === 'absence' && `⚠️ ${n.child_name} is absent`}
                        {n.type === 'custom' && n.message}
                      </span>
                      {n.status === 'failed' && (
                        <span className="status-badge failed">Failed to send</span>
                      )}
                    </div>
                  </div>
                  <div className="right">
                    <span className="time">{formatTime(n.created_at)}</span>
                    {!n.is_read && <span className="unread-badge">New</span>}
                  </div>
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