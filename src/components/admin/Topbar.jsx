import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Calendar,
  Clock,
  Circle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Update Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dropdown Close Handler
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    toast.success("Berhasil logout, sampai jumpa!");
    localStorage.clear();
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <header className="sticky top-0 z-[35] h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-8 flex items-center justify-between">
      
      {/* LEFT SIDE: SYSTEM TIME & DATE (Minimalist Version) */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200/50 rounded-2xl shadow-sm group hover:border-blue-200 transition-all">
          <Clock size={16} className="text-blue-600 animate-pulse" />
          <span className="text-sm font-black text-slate-700 tabular-nums tracking-tight">
            {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="hidden lg:flex flex-col border-l border-slate-200 pl-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">
            Today's Date
          </p>
          <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
            <Calendar size={13} className="text-slate-400" />
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: ACTIONS & PROFILE */}
      <div className="flex items-center gap-4">
        
        {/* Status Server (Simple Dot) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/50 rounded-xl">
           <Circle size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Live</span>
        </div>

        {/* Notif Button */}
        <button className="relative p-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all active:scale-90">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-1" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-3 p-1 rounded-2xl transition-all ${open ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 font-black text-sm">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            
            <div className="text-left hidden lg:block pr-2">
              <p className="text-xs font-black text-slate-800 leading-tight">{user?.name || "Admin"}</p>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{user?.role || "Administrator"}</p>
            </div>
            
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 mr-1 ${open ? 'rotate-180 text-blue-600' : ''}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-60 origin-top-right rounded-2xl border border-slate-200 bg-white shadow-2xl p-2 z-50"
              >
                <div className="px-4 py-3 bg-slate-50 rounded-xl mb-2 overflow-hidden">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">User Account</p>
                  <p className="text-sm font-black text-slate-800 truncate">{user?.name}</p>
                </div>

                <div className="space-y-1">
                  <DropdownItem onClick={() => navigate("/admin/profile")} icon={User} label="Profile" />
                  <DropdownItem icon={Settings} label="Settings" />
                </div>

                <div className="my-2 border-t border-slate-100" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-3 text-sm font-black text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <div className="p-1.5 bg-rose-100 rounded-lg"><LogOut size={16} /></div>
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// Sub-component untuk Dropdown Item agar rapi
function DropdownItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all group"
    >
      <div className="p-1.5 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
        <Icon size={16} />
      </div>
      {label}
    </button>
  );
}