import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../App.css";


const ParentLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const parentLinks = [
    { label: "Dashboard", path: "/parent/dashboard" },
    { label: "My Children", path: "/parent/my-children" },
    { label: "Attendance History", path: "/parent/attendance-history" },
    { label: "Notifications", path: "/parent/notifications" },
    { label: "Profile", path: "/parent/profile" },
     { label: "Settings", path: "/parent/settings" },
  ];

  return (
    <div className="layout">
      <Sidebar
        title="Parent Panel"
        links={parentLinks}
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Navbar user={user} role="Parent" />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ParentLayout;
