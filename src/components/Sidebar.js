import { NavLink } from "react-router-dom";

const Sidebar = ({ title, links = [], onLogout }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">{title}</h2>
      <nav className="sidebar-nav">
        {links.length > 0 ? (
          links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {link.label}
            </NavLink>
          ))
        ) : (
          <p>No links available</p>
        )}
      </nav>

      {onLogout && (
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
