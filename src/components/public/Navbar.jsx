import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../style/layout.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">E-Learning</h2>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quiz">Tryout</Link></li>
        <li><Link to="/course">Course</Link></li>
      </ul>

      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        )}

        {user && (
          <div className="profile-wrapper">
            {user.role === "admin" && (
              <Link to="/admin">
                <button>Admin Panel</button>
              </Link>
            )}

            <div
              className="avatar"
              onClick={() => setOpen(!open)}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            {open && (
              <div className="dropdown">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
