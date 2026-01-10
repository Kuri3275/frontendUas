import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon, LogOut, User, Menu, X } from "lucide-react"; 

export default function Navbar({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* LOGO - Mengikuti gaya gambar (font spasi lebar) */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center group-hover:rotate-12 transition-transform">
             <span className="text-[#020617] font-black text-xl">E</span>
          </div>
          <span className={`text-xl font-bold tracking-[0.2em] transition-colors ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}>
            EXCEL<span className="text-cyan-400">LEARN</span>
          </span>
        </Link>

        {/* MENU - Font kecil, Uppercase, Tracking wide ala gambar */}
        <ul className={`hidden md:flex items-center gap-10 font-medium text-[10px] uppercase tracking-[0.25em] transition-colors ${
          isDarkMode ? "text-slate-400" : "text-slate-600"
        }`}>
          <li><Link to="/" className="hover:text-cyan-400 transition-colors relative group">Home<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span></Link></li>
          <li><Link to="/Course" className="hover:text-cyan-400 transition-colors relative group">Course<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span></Link></li>
          <li><Link to="/Materi" className="hover:text-cyan-400 transition-colors relative group">Materi<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span></Link></li>
          <li><Link to="/Quiz" className="hover:text-cyan-400 transition-colors relative group">Quiz<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span></Link></li>
          <li><Link to="/About" className="hover:text-cyan-400 transition-colors relative group">Tentang<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span></Link></li>
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">
          
          {/* THEME SWITCHER */}
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all active:scale-90 border border-white/10 ${
              isDarkMode ? "bg-white/5 text-cyan-400 hover:bg-white/10" : "bg-slate-100 text-slate-600"
            }`}
          >
            {isDarkMode ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
          </button>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                Login
              </Link>
              <Link to="/register">
                <button className="px-6 py-2.5 text-[10px] font-bold bg-white text-slate-950 hover:bg-cyan-400 transition-all rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
                  Join Free
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* AVATAR DENGAN GLOW */}
              <div
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center cursor-pointer font-bold text-white border-2 border-white/20 hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* DROPDOWN GLASSMORPHISM */}
              {open && (
                <div className="absolute right-0 top-14 w-56 bg-[#0a1024]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-3 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="px-5 py-3 border-b border-white/5">
                    <p className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">Account</p>
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-xs text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition">
                    <User size={14} /> Profil Saya
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-xs text-rose-400 hover:bg-rose-500/10 transition text-left">
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}