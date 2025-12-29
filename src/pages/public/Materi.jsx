import React, { useState, useEffect } from "react";
import { PlayCircle, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MateriList() {
  const [materis, setMateris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sesuaikan dengan endpoint API materi kamu di Laravel
    axios.get("http://localhost:8000/api/materi")
      .then((res) => {
        setMateris(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Eksplor Materi</h1>
            <p className="text-gray-500 mt-2">Temukan berbagai materi menarik untuk upgrade skill kamu.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari judul materi..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {/* GRID MATERI */}
        {loading ? (
          <div className="text-center py-20">Memuat materi...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materis.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition group">
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={item.thumbnail || "https://via.placeholder.com/400x225"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <PlayCircle className="text-white" size={48} />
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-3 line-clamp-2 h-12">
                    {item.title}
                  </h3>
                  
                  <hr className="my-4 border-gray-50" />
                  
                  <Link to={`/materi/${item.id}`}>
                    <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition">
                      Pelajari Sekarang
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}