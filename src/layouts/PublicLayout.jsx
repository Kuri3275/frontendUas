import React, { useState, useEffect } from "react";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
           (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // Kita tambahkan styling transisi dan background dasar yang dalam
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${isDarkMode ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      
      {/* BACKGROUND DECORATION (Hanya muncul di Dark Mode agar mirip gambar Cthulhu) */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Cahaya Biru di Kanan Atas */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
          {/* Cahaya Cyan di Kiri Bawah */}
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full"></div>
          {/* Tekstur Grain halus agar terlihat lebih sinematik */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        </div>
      )}

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        {/* Main content dengan padding top agar tidak tertutup Navbar transparan */}
        <main className="flex-grow">
          <Outlet context={{ isDarkMode }} />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}