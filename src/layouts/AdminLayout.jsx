import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout() {
  const location = useLocation(); // Diperlukan untuk trigger animasi transisi

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex"> {/* Warna background lebih soft dari gray-100 */}
      
      {/* Sidebar - Fixed w-64 */}
      <Sidebar />

      {/* Main area - Fixed Margin Left 64 */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        
        {/* Topbar - Buat sticky agar navigasi selalu terlihat */}
        <div className="sticky top-0 z-30">
          <Topbar />
        </div>

        {/* Content Area */}
        <main className="flex-1 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            
            {/* Animasi Transisi Halaman */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname} // Animasi ulang setiap ganti URL
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

          </div>
        </main>

        {/* Footer Kecil (Opsional) */}
        <footer className="px-8 py-6 text-center text-slate-400 text-xs font-medium">
          © 2026 E-Learn Admin System • Crafted with Passion
        </footer>
      </div>
    </div>
  );
}