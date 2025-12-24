import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Layers,
  HelpCircle
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <h2 className="text-lg font-bold tracking-wide">
          E-Learning
        </h2>
      </div>

      {/* Menu */}
      <nav className="px-3 py-6 space-y-1">
        <SidebarItem
          to="/admin/dashboard"
          label="Dashboard"
          icon={LayoutDashboard}
        />

        <SidebarItem
          to="/admin/courses"
          label="Courses"
          icon={BookOpen}
        />

        <SidebarItem
          to="/admin/materials"
          label="Materials"
          icon={FileText}
        />

        <SidebarItem
          to="/admin/quiz-categories"
          label="Quiz Categories"
          icon={Layers}
        />

        <SidebarItem
          to="/admin/quizzes"
          label="Quizzes"
          icon={HelpCircle}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium
        transition-colors
        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
        `
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
}
