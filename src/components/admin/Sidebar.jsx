import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Layers,
  HelpCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar() {
  return (
    <aside className="
      fixed inset-y-0 left-0 z-40 w-64
      bg-white/80 backdrop-blur-xl
      border-r border-gray-200
      shadow-lg
    ">
      {/* LOGO */}
      <div className="flex h-16 items-center px-6 border-b">
        <h2 className="text-lg font-extrabold tracking-wide text-blue-600">
          E-Learning Admin
        </h2>
      </div>

      {/* MENU */}
      <nav className="px-3 py-6 space-y-1">
        <SidebarItem to="/admin/dashboard" label="Dashboard" icon={LayoutDashboard} />
        <SidebarItem to="/admin/courses" label="Courses" icon={BookOpen} />
        <SidebarItem to="/admin/materials" label="Materials" icon={FileText} />
        <SidebarItem to="/admin/quiz-categories" label="Quiz Categories" icon={Layers} />
        <SidebarItem to="/admin/quizzes" label="Quizzes" icon={HelpCircle} />
      </nav>
    </aside>
  );
}

function SidebarItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      onClick={() => toast.success(`Navigated to ${label}`)}
      className={({ isActive }) => `
        group relative flex items-center gap-3
        rounded-lg px-4 py-2 text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {/* Active indicator */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2
          h-6 w-1 rounded-r
          transition-all
          ${
            location.pathname === to
              ? "bg-blue-600"
              : "bg-transparent group-hover:bg-gray-300"
          }
        `}
      />

      <Icon size={18} />
      <span className="tracking-wide">{label}</span>
    </NavLink>
  );
}
