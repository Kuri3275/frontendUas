import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Users, BookOpen, FileText, HelpCircle, Plus, ArrowRight, Layout } from "lucide-react";
import { Link } from "react-router-dom"; // Pastikan pakai react-router-dom

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return (
    <div className="p-8 text-slate-400 font-medium animate-pulse">Memuat data dashboard...</div>
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      
      {/* 1. Header Sederhana */}
      <div>
        <h2 className="text-2xl font-black text-slate-800">Ringkasan Sistem</h2>
        <p className="text-slate-500 text-sm">Selamat bekerja kembali, berikut status data Anda saat ini.</p>
      </div>

      {/* 2. Kartu Statistik Utama (Hanya 4 data dasar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatCard title="Total Siswa" value={stats.users} icon={<Users size={20}/>} color="bg-blue-600" />
        <SimpleStatCard title="Total Kursus" value={stats.courses} icon={<BookOpen size={20}/>} color="bg-indigo-600" />
        <SimpleStatCard title="Total Materi" value={stats.materials} icon={<FileText size={20}/>} color="bg-amber-600" />
        <SimpleStatCard title="Total Kuis" value={stats.quizzes} icon={<HelpCircle size={20}/>} color="bg-rose-600" />
      </div>

      {/* 3. Panel Navigasi Cepat (Sangat Berguna!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
           <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Plus size={18} className="text-indigo-600" /> Kelola Cepat
           </h3>
           <div className="grid grid-cols-1 gap-3">
              <QuickLink to="/admin/courses" label="Buka Kelola Kursus" />
              <QuickLink to="/admin/quizzes" label="Buka Kelola Kuis" />
           </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
           <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
             <Layout size={18} /> Info Sistem
           </h3>
           <p className="text-sm text-indigo-700 leading-relaxed">
             Dashboard ini terhubung langsung dengan database. Perubahan di menu Kelola Kursus atau Kuis akan langsung memperbarui angka di atas secara otomatis.
           </p>
        </div>
      </div>

    </div>
  );
}

// Komponen Kecil agar Kode Rapi
function SimpleStatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-2xl shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-black text-slate-800">{value}</h4>
      </div>
    </div>
  );
}

function QuickLink({ to, label }) {
  return (
    <Link to={to} className="flex justify-between items-center p-4 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all group">
      <span className="font-bold text-sm">{label}</span>
      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
    </Link>
  );
}