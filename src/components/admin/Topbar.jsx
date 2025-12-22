import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../../style/admin.css";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="admin-topbar">
      <h2 className="admin-page-title">{pageTitle}</h2>

      <div className="admin-user" ref={dropdownRef}>
        <div
          className="admin-avatar"
          onClick={() => setOpen(!open)}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {open && (
          <div className="admin-dropdown">
            <div className="dropdown-header">
              <strong>{user?.name}</strong>
              <span>{user?.role}</span>
            </div>

            <button
              className="dropdown-item"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <button
              className="dropdown-item logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function getPageTitle(pathname) {
  if (pathname.includes("dashboard")) return "Dashboard";
  if (pathname.includes("courses")) return "Kelola Course";
  if (pathname.includes("materials")) return "Kelola Materi";
  if (pathname.includes("quiz-categories")) return "Kategori Quiz";
  if (pathname.includes("quizzes")) return "Kelola Quiz";
  return "Admin Panel";
}
