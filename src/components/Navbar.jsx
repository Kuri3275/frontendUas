import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10">
  <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between ">


    {/* LOGO */}
    <h2 className="text-2xl font-bold tracking-wide text-white">
      <span className="text-indigo-500">Excellearn</span>
    </h2>

    {/* MENU */}
    <ul className="hidden md:flex items-center gap-10 text-gray-300 font-medium">
      <li>
        <Link
          to="/"
          className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/quiz"
          className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
        >
          Course
        </Link>
      </li>
      <li>
        <Link
          to="/course"
          className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
        >
          Materi
        </Link>
      </li>
      <li>
        <Link
          to="/course"
          className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
        >
          Quizz
        </Link>
      </li>
    </ul>

    {/* RIGHT */}
    <div className="flex items-center gap-4">
      {!user && (
        <>
          <Link to="/login">
            <button className="px-5 py-2 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 rounded-lg text-indigo-300 hover:text-black hover:bg-white/10 transition">
              Register
            </button>
          </Link>
        </>
      )}

      {user && (
        <div className="relative flex items-center gap-4">

          {user.role === "admin" && (
            <Link to="/admin">
              <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-sm font-semibold">
                Admin Panel
              </button>
            </Link>
          )}

          {/* AVATAR */}
          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer font-bold text-white hover:ring-2 hover:ring-indigo-400 transition"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-14 w-44 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <Link
                to="/profile"
                className="block px-4 py-3 hover:bg-white/10 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-red-400 transition"
              >
                Logout
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
