import { Link } from "react-router-dom";
import "../style/layout.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">E-Learning</h2>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/quiz">Tryout</Link></li>
        <li><Link to="/course">Course</Link></li>
      </ul>

      <div className="nav-right">
        <input type="text" placeholder="Cari..." />
        <Link to="/profile">
          <button>Profil</button>
        </Link>
      </div>
    </nav>
  );
}
