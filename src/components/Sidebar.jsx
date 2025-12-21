import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h3>Admin Panel</h3>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/courses">Kelola Kursus</Link>
      <Link to="/admin/materials">Kelola Materi</Link>
      <Link to="/admin/quizzes">Kelola Quiz</Link>
    </aside>
  );
}
