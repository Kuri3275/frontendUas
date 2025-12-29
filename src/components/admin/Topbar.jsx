import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Search,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Ambil user dengan proteksi jika data kosong
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    toast.success("Berhasil logout, sampai jumpa!");
    localStorage.clear();
    setTimeout(() => navigate("/login"), 800);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-8">
      <div className="flex h-full items-center justify-between">
        
        {/* LEFT SIDE: SEARCH BAR (Meningkatkan visual agar tidak kosong) */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search something..." 
            className="pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 outline-none text-sm text-slate-600 w-64 transition-all"
          />
        </div>

        {/* RIGHT SIDE: ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* NOTIFICATION BUTTON */}
          <button className="relative p-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white group-hover:scale-110 transition-transform"></span>
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-2" />

          {/* PROFILE SECTION */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-3 p-1.5 rounded-xl transition-all ${open ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="text-left hidden sm:block">
                <p className="text-xs font-black text-slate-800 leading-none mb-1">{user?.name || "Admin"}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{user?.role || "Administrator"}</p>
              </div>
              
              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-60 origin-top-right rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 p-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-slate-50/50 rounded-xl mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                  </div>

                  <div className="space-y-1">
                    <button onClick={() => navigate("/profile")} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-blue-100"><User size={16} /></div>
                      My Profile
                    </button>
                    <button className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-blue-100"><Settings size={16} /></div>
                      Settings
                    </button>
                  </div>

                  <div className="my-2 border-t border-slate-100" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <div className="p-1.5 bg-rose-100 rounded-lg"><LogOut size={16} /></div>
                    Logout Account
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}