import React from 'react'; 
import { CheckCircle2 } from "lucide-react"; 

export default function Card({ title, desc, icon: Icon }) {
  return (
    <div
      className="
        group relative 
        bg-white/[0.03] 
        backdrop-blur-md
        border border-white/10
        rounded-[2rem]
        p-8
        transition-all duration-500
        hover:-translate-y-2
        hover:bg-white/[0.07]
        hover:border-cyan-500/50
        hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
        overflow-hidden
      "
    >
      {/* Dekorasi Cahaya Interior (Glow saat Hover) */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Label Modul (Estetika desain gambar) */}
      <div className="text-[9px] font-mono text-slate-500 tracking-[0.2em] mb-4 uppercase group-hover:text-cyan-400 transition-colors">
        Excellearn Module
      </div>

      {/* Ikon dengan Frame Glass */}
      <div className="relative w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-[#020617] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-500">
        {Icon ? <Icon size={24} strokeWidth={1.5} /> : <CheckCircle2 size={24} strokeWidth={1.5} />}
      </div>

      {/* Teks */}
      <div className="relative">
        <h3 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed font-light">
          {desc}
        </p>
      </div>

      {/* Indikator Sudut (Aksen kecil di desain modern) */}
      <div className="absolute top-4 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan]"></div>
      </div>

      {/* Garis Progress Bawah (Cyan Neon) */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-700 w-0 group-hover:w-full" />
    </div>
  );
}