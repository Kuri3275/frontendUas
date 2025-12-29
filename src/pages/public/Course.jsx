import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sesuaikan URL dengan port Laravel kamu
    axios.get("http://localhost:8000/api/courses")
      .then((res) => {
        if (res.data.success) {
          // Karena pakai paginate, datanya ada di res.data.data.data
          setCourses(res.data.data.data); 
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center pt-40">Memuat katalog kursus...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Katalog Kursus</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.2)] transition-shadow group">
              <div className="h-48 overflow-hidden relative bg-indigo-100">
                {/* Pakai thumbnail_url hasil transform di Controller kamu */}
                <img 
                  src={course.thumbnail_url || "https://via.placeholder.com/400x250"} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                  {course.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-4 line-clamp-2">{course.title}</h3>
                
                <div className="flex items-center gap-2 text-gray-500 mb-6">
                  <BookOpen size={18} className="text-indigo-500" />
                  {/* Di Controller kamu pakai withCount('materials') */}
                  <span className="text-sm">{course.materials_count || 0} Materi Pelajaran</span>
                </div>

                <Link to={`/course/${course.id}`}>
                  <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    Mulai Belajar <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 