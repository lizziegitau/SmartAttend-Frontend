import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  // role-based settings path
  const settingsPath =
    role === "admin" ? "/admin/settings" : "/parent/settings";

  return (
    <header className="navbar">
      {/* LEFT */}
      <h1 className="navbar-logo">SmartAttend AI</h1>

      {/* RIGHT */}
      <div className="navbar-icons">
        {/* Settings */}
        <Link to={settingsPath} className="icon-btn" title="Settings">
          ⚙️
        </Link>

        {/* Logout */}
        <button
          className="icon-btn logout"
          onClick={handleLogout}
          title="Logout"
        >
          ⎋
        </button>
      </div>
    </header>
  );
};

export default Navbar;
