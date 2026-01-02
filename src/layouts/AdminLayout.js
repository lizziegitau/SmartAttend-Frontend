import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../App.css";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Register Student", path: "/admin/students/register" },
    { label: "View Students", path: "/admin/students/view" },
    { label: "Face Enrollment", path: "/admin/face-enrollment" },
    { label: "Live Attendance", path: "/admin/attendance/live" },
    { label: "Attendance History", path: "/admin/attendance/history" },
    { label: "Daily Report", path: "/admin/reports/daily" },
    { label: "Monthly Report", path: "/admin/reports/monthly" },
    //{ label: "Register Parent", path: "/admin/parents/register" },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="layout">
      <Sidebar
        title="Admin Panel"
        links={adminLinks}
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Navbar user={user} role="Admin" />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
