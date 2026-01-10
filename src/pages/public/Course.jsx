import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, BookOpen, ArrowRight, LayoutGrid, Code2, ChevronDown, ChevronRight, Hash, Terminal } from "lucide-react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/courses")
      .then((res) => {
        if (res.data.success) {
          setCourses(res.data.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load courses", err);
        setLoading(false);
      });
  }, []);

  const uniqueCategories = [
    "Semua",
    ...new Set(courses.map((course) => course.category?.name).filter(Boolean))
  ];

  const filteredCourses = activeCategory === "Semua"
    ? courses
    : courses.filter((c) => c.category?.name === activeCategory);

  const handleCategoryClick = (cat) => {
    if (cat === "Semua") {
      setActiveCategory("Semua");
      setOpenDropdown(null);
    } else {
      setOpenDropdown(openDropdown === cat ? null : cat);
      setActiveCategory(cat);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
      <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_20px_rgba(34,211,238,0.2)]"></div>
      <p className="mt-6 text-cyan-400 font-mono text-xs tracking-[0.3em] animate-pulse">INITIATING_SYSTEM...</p>
    </div>
  );

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 text-slate-300 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase">
              <Terminal size={14} /> /root/excellearn/courses
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Modules</span>
            </h1>
          </div>

          {/* Search Box Glassmorphism */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-focus-within:border-cyan-500/50 transition-all">
              <Search className="ml-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full md:w-80 pl-4 pr-6 py-4 bg-transparent border-none text-white text-sm outline-none focus:ring-0 placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR: DIRECTORY TREE */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-6 sticky top-32 shadow-2xl">
              <h2 className="px-4 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-6 border-b border-white/5 pb-4 flex justify-between items-center">
                Directory Tree
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_cyan]"></span>
              </h2>
              
              <nav className="space-y-3">
                {uniqueCategories.map((cat) => (
                  <div key={cat} className="space-y-2">
                    <button 
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-all duration-300 ${
                        activeCategory === cat 
                        ? 'bg-cyan-500 text-[#020617] shadow-[0_0_25px_rgba(34,211,238,0.4)] scale-[1.02]' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {cat === "Semua" ? <LayoutGrid size={16} /> : <Code2 size={16} />}
                        {cat}
                      </div>
                      {cat !== "Semua" && (
                        <div className={`transition-transform duration-300 ${openDropdown === cat ? 'rotate-90 text-[#020617]' : ''}`}>
                            <ChevronRight size={14} />
                        </div>
                      )}
                    </button>

                    {/* SUB-MENU ANIMATION */}
                    {openDropdown === cat && cat !== "Semua" && (
                      <div className="ml-6 pl-4 border-l border-white/10 space-y-1 py-2 animate-in slide-in-from-top-2 duration-300">
                        {courses
                          .filter(course => course.category?.name === cat)
                          .map((course) => (
                            <Link
                              key={course.id}
                              to={`/course/${course.id}`}
                              className="flex items-center gap-3 w-full text-left p-2.5 rounded-xl text-[10px] font-mono text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all group"
                            >
                              <Hash size={12} className="text-slate-700 group-hover:text-cyan-500" />
                              <span className="truncate">{course.title.toLowerCase().replace(/\s+/g, '-')}</span>
                            </Link>
                          ))
                        }
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN GRID: MODULE CARDS */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
              {filteredCourses.map((course) => (
                <div key={course.id} className="group relative bg-white/[0.02] rounded-[3rem] p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-3 hover:bg-white/[0.04] shadow-2xl">
                  {/* Image Container with Custom Arch Style */}
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-8 bg-slate-900 border border-white/5">
                    <img 
                      src={course.thumbnail ? `http://localhost:8000/storage/${course.thumbnail}` : "https://via.placeholder.com/400x300"} 
                      alt={course.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-2 bg-[#020617]/80 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-cyan-400 rounded-full">
                        {course.category?.name || "CORE"}
                      </span>
                    </div>
                  </div>

                  <div className="px-3 space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-light">
                      {course.description || "Experimental module ready for deployment into production environment."}
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <BookOpen size={14} className="text-cyan-500" />
                        {course.materials_count || 0} Modules
                      </div>
                      <Link 
                        to={`/course/${course.id}`}
                        className="flex items-center gap-3 text-[#020617] font-black text-[10px] bg-white hover:bg-cyan-400 px-6 py-3 rounded-full transition-all tracking-[0.2em] uppercase active:scale-95"
                      >
                        Execute <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Terminal size={24} className="text-slate-600" />
                </div>
                <p className="text-slate-500 font-mono text-sm tracking-widest animate-pulse">
                   // NULL_DATA: NO_RESOURCES_FOUND_IN_THIS_DIRECTORY
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}