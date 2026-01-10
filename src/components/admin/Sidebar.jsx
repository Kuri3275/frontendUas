import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutGrid,        // Dashboard
  BookOpenCheck,     // Courses
  FileText,          // Course Categories
  Video,             // Materials
  Folder,            // Materi Categories
  FileQuestion,      // Quizzes
  MessageSquare,     // Quiz Questions
  GraduationCap,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Sidebar() {
  const [parent] = useAutoAnimate();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/60 shadow-[10px_0_30px_rgba(0,0,0,0.03)] flex flex-col">
      
      {/* LOGO SECTION */}
      <div className="flex h-20 items-center px-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-blue-200/50">
            <GraduationCap size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
            E-Learn<span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">Admin</span>
          </h2>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav ref={parent} className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        <SidebarItem to="/admin/dashboard" label="Dashboard" icon={LayoutGrid} />

        {/* Content Section */}
        <SectionTitle title="Content Management" />
        <SidebarItem to="/admin/course-categories" label="Course Categories" icon={FileText} />
        <SidebarItem to="/admin/courses" label="Courses Sub Categories" icon={BookOpenCheck} />
        <SidebarItem to="/admin/material-categories" label="Materi Categories" icon={Folder} />
        <SidebarItem to="/admin/materials" label="Detail Materials " icon={Video} />

        {/* Assessment Section */}
        <SectionTitle title="Assessment" />
        <SidebarItem to="/admin/quiz-categories" label="Quiz Categories" icon={Folder} />
        <SidebarItem to="/admin/quizzes" label="Quizzes Exam" icon={FileQuestion} />
      </nav>

      {/* FOOTER STATUS */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/30">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-inner">
            <Sparkles size={16} className="animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
            <p className="text-[11px] font-bold text-blue-600 truncate">v1.0.0 Production</p>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}

/**
 * SIDEBAR ITEM COMPONENT
 */
function SidebarItem({ to, label, icon: Icon }) {
  const location = useLocation();
  
  // FIX: Menggunakan startsWith agar menu tetap aktif saat di sub-halaman (edit/create)
  const isActive = location.pathname.startsWith(to);

  return (
    <NavLink to={to} className="block relative group no-underline outline-none">
      <div className={`
        relative z-10 flex items-center gap-3 rounded-xl px-4 py-3
        transition-all duration-300 ease-out
        ${isActive 
          ? "text-white shadow-xl shadow-blue-500/20" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
      `}>
        {/* Latar Belakang Aktif dengan Framer Motion */}
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 -z-10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        
        {/* Ikon Box */}
        <motion.div
          whileHover={{ rotate: isActive ? 0 : [0, -10, 10, 0] }}
          className={`p-1.5 rounded-lg transition-colors shadow-sm ${
            isActive 
              ? 'bg-white/20' 
              : 'bg-white border border-slate-100 group-hover:border-blue-200'
          }`}
        >
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        </motion.div>

        {/* Label */}
        <span className={`text-[13px] tracking-wide flex-1 transition-all ${isActive ? "font-black" : "font-bold text-slate-500 group-hover:text-slate-900"}`}>
          {label}
        </span>

        {/* Indikator Titik Aktif */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]"
          />
        )}
      </div>

      {/* Indikator Hover Samping */}
      {!isActive && (
        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-1/2 bg-blue-600 rounded-full group-hover:w-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100" />
      )}
    </NavLink>
  );
}

/**
 * SECTION TITLE COMPONENT
 */
function SectionTitle({ title }) {
  return (
    <div className="pt-5 pb-2 px-3 flex items-center gap-3">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
        {title}
      </p>
      <div className="h-[1px] w-full bg-slate-100/80"></div>
    </div>
  );
}