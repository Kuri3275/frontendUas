export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">E-Learning</div>

      <ul className="nav-menu">
        <li>Home</li>
        <li>Blog</li>
        <li>Tryout</li>
        <li>Course</li>
      </ul>

      <div className="nav-right">
        <input type="text" placeholder="Cari..." />
        <button>Profil</button>
      </div>
    </nav>
  );
}
