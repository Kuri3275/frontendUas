import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Menu
} from "lucide-react";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const pageTitle = getPageTitle(location.pathname);

 const handleLogout = () => {
  toast.success("Logout berhasil");
  localStorage.clear();
  setTimeout(() => navigate("/login"), 800);
};



  // close dropdown if click outside
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
            <header className="
          sticky top-0 z-30 h-16
          bg-white/80 backdrop-blur-xl
          border-b border-gray-200
          shadow-sm
        ">

      <div className="flex h-full items-center justify-between px-6 ml-64">

        {/* PAGE TITLE */}
        <h2 className="text-lg font-semibold text-gray-800">
          {pageTitle}
        </h2>

        {/* RIGHT ACTION */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>

          {/* NOTIFICATION */}
          <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* PROFILE */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-12 w-48 rounded-md border bg-white shadow-lg overflow-hidden cursor-pointer z-50">

              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ===== PAGE TITLE MAPPER ===== */
function getPageTitle(pathname) {
  if (pathname.includes("dashboard")) return "Dashboard";
  if (pathname.includes("courses")) return "Kelola Course";
  if (pathname.includes("materials")) return "Kelola Materi";
  if (pathname.includes("quiz-categories")) return "Kategori Quiz";
  if (pathname.includes("quizzes")) return "Kelola Quiz";
  return "Admin Panel";
}
