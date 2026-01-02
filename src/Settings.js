import { useState } from "react";

const Settings = ({ role }) => {
  // ===== SHARED STATE =====
  const [schoolName, setSchoolName] = useState("Smart High School");

  // ===== ADMIN NOTIFICATIONS =====
  const [adminEmailNotifications, setAdminEmailNotifications] = useState(false);
  const [adminAppNotifications, setAdminAppNotifications] = useState(true);
  const [aiInternetEnabled, setAiInternetEnabled] = useState(true);

  // ===== PARENT NOTIFICATIONS =====
  const [parentEmailNotifications, setParentEmailNotifications] = useState(false);
  const [parentAppNotifications, setParentAppNotifications] = useState(true);
  const [receiveAnnouncements, setReceiveAnnouncements] = useState(true);

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>
          {role === "admin"
            ? "Manage school system, AI services, and notification channels."
            : "Manage your personal notification and communication preferences."}
        </p>
      </div>

      <div className="settings-grid">

        {/* ================= ADMIN SETTINGS ================= */}
        {role === "admin" && (
          <>
            {/* School Info */}
            <div className="settings-card">
              <h3>School Information</h3>
              <div className="input-group">
                <label>School Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <button className="save-btn">Save Changes</button>
            </div>

            {/* AI System */}
            <div className="settings-card">
              <h3>AI-Enabled System</h3>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={aiInternetEnabled}
                  onChange={() => setAiInternetEnabled(!aiInternetEnabled)}
                />
                <span className="slider round"></span>
              </label>
              <p>
                {aiInternetEnabled
                  ? "AI-Enabled Internet: Active"
                  : "AI-Enabled Internet: Disabled"}
              </p>
            </div>

            {/* Admin Notifications */}
            <div className="settings-card">
              <h3>Notification Channels</h3>

              {/* In-App */}
              <div className="notification-row">
                <span>In-App Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={adminAppNotifications}
                    onChange={() =>
                      setAdminAppNotifications(!adminAppNotifications)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* Email */}
              <div className="notification-row">
                <span>Email Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={adminEmailNotifications}
                    onChange={() =>
                      setAdminEmailNotifications(!adminEmailNotifications)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <p className="hint">
                Turning on Email Notifications means you agree to receive system
                alerts via email.
              </p>
            </div>
          </>
        )}

        {/* ================= PARENT SETTINGS ================= */}
        {role === "parent" && (
          <>
            {/* School Info (Read-Only) */}
            <div className="settings-card">
              <h3>School Information</h3>
              <p className="read-only">
                <strong>School Name:</strong> {schoolName}
              </p>
              <small>Managed by the school administrator.</small>
            </div>

            {/* Parent Notifications */}
            <div className="settings-card">
              <h3>Notification Channels</h3>

              {/* In-App */}
              <div className="notification-row">
                <span>In-App Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={parentAppNotifications}
                    onChange={() =>
                      setParentAppNotifications(!parentAppNotifications)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* Email */}
              <div className="notification-row">
                <span>Email Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={parentEmailNotifications}
                    onChange={() =>
                      setParentEmailNotifications(!parentEmailNotifications)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <p className="hint">
                Enabling email notifications means you will receive attendance
                and school updates via email.
              </p>
            </div>

            {/* Announcements */}
            <div className="settings-card">
              <h3>Communication Preferences</h3>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={receiveAnnouncements}
                  onChange={() =>
                    setReceiveAnnouncements(!receiveAnnouncements)
                  }
                />
                <span className="slider round"></span>
              </label>
              <p>
                {receiveAnnouncements
                  ? "School Announcements Enabled"
                  : "Announcements Disabled"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
