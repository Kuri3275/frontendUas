import React, { useState } from "react";
import { PlayCircle, FileText, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function MateriDetail() {
  // Nanti data ini diambil dari API: /api/courses/{id}
  const courseDetail = {
    title: "Mastering Tailwind CSS",
    materis: [
      { id: 1, title: "Pengenalan Utility First", type: "video", duration: "10:00" },
      { id: 2, title: "Instalasi & Konfigurasi", type: "video", duration: "15:00" },
      { id: 3, title: "Layouting dengan Flexbox", type: "text", duration: "5 mnt baca" },
    ]
  };

  const [activeMateri, setActiveMateri] = useState(courseDetail.materis[0]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="flex flex-col lg:flex-row">
        
        {/* SIDEBAR DAFTAR MATERI */}
        <div className="w-full lg:w-80 bg-gray-50 h-screen overflow-y-auto border-r border-gray-200 p-6">
          <Link to="/course" className="flex items-center gap-2 text-indigo-600 font-medium mb-6 hover:underline">
            <ArrowLeft size={18} /> Kembali ke Kursus
          </Link>
          <h2 className="text-xl font-bold text-gray-900 mb-6">{courseDetail.title}</h2>
          
          <div className="space-y-3">
            {courseDetail.materis.map((materi) => (
              <button
                key={materi.id}
                onClick={() => setActiveMateri(materi)}
                className={`w-full flex items-start gap-3 p-4 rounded-2xl transition-all text-left ${
                  activeMateri.id === materi.id 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                  : "bg-white text-gray-600 hover:bg-indigo-50"
                }`}
              >
                {materi.type === "video" ? <PlayCircle size={20} /> : <FileText size={20} />}
                <div>
                  <p className="text-sm font-bold leading-tight">{materi.title}</p>
                  <p className={`text-xs mt-1 ${activeMateri.id === materi.id ? "text-indigo-100" : "text-gray-400"}`}>
                    {materi.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AREA KONTEN UTAMA */}
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Judul Materi yang Aktif */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{activeMateri.title}</h1>
            
            {/* Tempat Video / Konten */}
            <div className="aspect-video bg-gray-900 rounded-[32px] mb-8 flex items-center justify-center text-white overflow-hidden shadow-2xl">
              {activeMateri.type === "video" ? (
                <div className="text-center">
                  <PlayCircle size={64} className="mx-auto mb-4 text-indigo-400" />
                  <p>Video Player Akan Muncul di Sini (Gunakan Iframe YouTube/Cloudinary)</p>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <FileText size={64} className="mx-auto mb-4 text-indigo-400" />
                  <p>Materi Berupa Artikel/Teks</p>
                </div>
              )}
            </div>

            {/* Tombol Selesai */}
            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-300">
              <div>
                <p className="font-bold text-gray-900">Sudah paham materi ini?</p>
                <p className="text-sm text-gray-500">Tandai sebagai selesai untuk lanjut ke quiz.</p>
              </div>
              <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition">
                <CheckCircle size={20} /> Selesai Belajar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}