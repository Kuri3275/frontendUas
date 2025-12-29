// 1. Letakkan di paling atas (opsional di React 18+, tapi aman untuk dipasang)
import React from 'react'; 
// 2. Import ikon dari lucide
import { CheckCircle2 } from "lucide-react"; 

export default function Card({ title, desc, icon: Icon }) {
  return (
    <div
      className="
        group relative bg-white
        border border-gray-100
        rounded-2xl
        p-8
        shadow-[0_25px_50px_-12px_rgba(99,102,241,0.2)]
        transition-all duration-500
        hover:-translate-y-3
        hover:border-indigo-400
        hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.2)]
        overflow-hidden
      "
    >
      {/* Dekorasi Cahaya */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Ikon */}
      <div className="relative w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {Icon ? <Icon size={28} /> : <CheckCircle2 size={28} />}
      </div>

      {/* Teks */}
      <div className="relative">
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Garis Progress saat Hover */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 w-0 group-hover:w-full" />
    </div>
  );
}