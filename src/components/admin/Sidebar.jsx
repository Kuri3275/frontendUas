import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Layers,
  HelpCircle
} from "lucide-react";

import "../../style/admin.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo">E-Learning</h2>

      <nav className="sidebar-menu">
        <SidebarItem
          to="/admin/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard size={18} />}
        />

        <SidebarItem
          to="/admin/courses"
          label="Courses"
          icon={<BookOpen size={18} />}
        />

        <SidebarItem
          to="/admin/materials"
          label="Materials"
          icon={<FileText size={18} />}
        />

        <SidebarItem
          to="/admin/quiz-categories"
          label="Quiz Categories"
          icon={<Layers size={18} />}
        />

        <SidebarItem
          to="/admin/quizzes"
          label="Quizzes"
          icon={<HelpCircle size={18} />}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-link active" : "sidebar-link"
      }
    >
      <span className="sidebar-icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
