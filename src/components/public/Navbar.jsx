import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  
  // STATE BARU: Menentukan apakah user sudah scroll atau belum
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-900/80 backdrop-blur-lg border-b border-white/10 py-3" // Saat di-scroll (Gelap & Blur)
          : "bg-transparent py-5" // Saat di paling atas (Transparan & Lebih Longgar)
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* LOGO: Putih bersih agar kontras di semua background */}
        <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white">
          EXCEL<span className={scrolled ? "text-indigo-400" : "text-indigo-200"}>LEARN</span>
        </Link>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-8 text-white/90 font-medium text-sm">
          <li><Link to="/" className="hover:text-white font-sans transition-colors">Home</Link></li>
          <li><Link to="/Course" className="hover:text-white font-sans transition-colors">Course</Link></li>
          <li><Link to="/About" className="hover:text-white font-sans transition-colors">Tentang Kami</Link></li>
          <li><Link to="/Materi" className="hover:text-white font-sans transition-colors">Materi</Link></li>
          <li><Link to="/Quiz" className="hover:text-white font-sans transition-colors">Quiz</Link></li>
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-full transition">
                  Masuk
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 text-sm font-bold bg-white text-indigo-600 hover:bg-indigo-50 rounded-full shadow-lg transition-all active:scale-95">
                  Daftar
                </button>
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-4">
              {/* AVATAR */}
              <div
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer font-bold text-white border-2 border-white/40 hover:border-white transition-all shadow-md"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 top-14 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white transition">Profil</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-600/20 transition">Keluar</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}