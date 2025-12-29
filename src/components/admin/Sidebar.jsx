import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutGrid,      // Dashboard
  BookOpenCheck,   // Courses
  Video,           // Materials
  FolderKanban,    // Categories
  FileQuestion,    // Quizzes
  MessageSquare,   // Quiz Questions
  GraduationCap,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Sidebar() {
  const [parent] = useAutoAnimate();

  return (
    <aside className="
      fixed inset-y-0 left-0 z-40 w-64
      bg-white border-r border-slate-200/60
      shadow-[10px_0_30px_rgba(0,0,0,0.03)]
      flex flex-col
    ">
      {/* LOGO SECTION - Dengan Gradasi */}
      <div className="flex h-20 items-center px-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-blue-200">
            <GraduationCap size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
            E-Learn<span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">Admin</span>
          </h2>
        </div>
      </div>

      {/* MENU SECTION */}
      <nav ref={parent} className="flex-1 px-4 py-8 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <SidebarItem to="/admin/dashboard" label="Dashboard" icon={LayoutGrid} color="bg-blue-500" />
        
        <div className="pt-6 pb-2 px-2 flex items-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Content</p>
          <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>
        
        <SidebarItem to="/admin/courses" label="Courses" icon={BookOpenCheck} color="bg-indigo-500" />
        <SidebarItem to="/admin/materials" label="Materials" icon={Video} color="bg-purple-500" />
        
        <div className="pt-6 pb-2 px-2 flex items-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Assessment</p>
          <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>
        
        <SidebarItem to="/admin/quiz-categories" label="Categories" icon={FolderKanban} color="bg-orange-500" />
        <SidebarItem to="/admin/quizzes" label="Quizzes" icon={FileQuestion} color="bg-rose-500" />
        {/* <SidebarItem to="/admin/quiz-questions" label="Questions" icon={MessageSquare} color="bg-emerald-500" /> */}
      </nav>

      {/* FOOTER INFO - Visual Upgrade */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-tr from-slate-50 to-blue-50/30 rounded-2xl p-4 border border-blue-100/50 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
            <Sparkles size={14} className="text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
            <p className="text-xs font-bold text-blue-600">v1.0.0 Production</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ to, label, icon: Icon, color }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      onClick={() => toast.success(`Mapsd to ${label}`)}
      className="block relative group no-underline"
    >
      <div className={`
        relative z-10 flex items-center gap-3 rounded-xl px-4 py-3
        transition-all duration-300
        ${isActive 
          ? "text-white shadow-lg shadow-blue-200/50" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
      `}>
        
        {/* Active Background Gradient */}
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 -z-10`}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          />
        )}

        {/* Icon Animation */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}
        >
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        </motion.div>

        <span className="text-[13px] font-bold tracking-wide flex-1">{label}</span>

        {/* Status Indicator */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
          />
        )}
      </div>

      {/* Hover Tooltip/Effect (Line on the left) */}
      {!isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1/2 bg-blue-500 rounded-r-full group-hover:w-1 transition-all duration-300" />
      )}
    </NavLink>
  );
}