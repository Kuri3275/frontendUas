import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, ArrowRight, Terminal, ChevronRight, PlayCircle, Database, Box } from "lucide-react";
import materiService from "../../api/user/materi.service";

export default function Materi() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState("Semua");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const res = await materiService.getAllMaterials();
        if (res.data.success) {
          const data = res.data.data.data || res.data.data || [];
          setMaterials(data);
        }
      } catch (err) {
        console.error("Gagal load materi", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const uniqueCourses = [
    "Semua",
    ...new Set(materials.map((m) => m.course?.title).filter(Boolean))
  ];

  const filteredMaterials = activeCourse === "Semua"
    ? materials
    : materials.filter((m) => m.course?.title === activeCourse);

  const handleCourseClick = (courseTitle) => {
    if (courseTitle === "Semua") {
      setActiveCourse("Semua");
      setOpenDropdown(null);
    } else {
      setOpenDropdown(openDropdown === courseTitle ? null : courseTitle);
      setActiveCourse(courseTitle);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
      <div className="w-16 h-16 border-2 border-cyan-500/10 border-t-cyan-400 rounded-full animate-spin"></div>
      <p className="mt-6 text-cyan-400 font-mono text-[10px] tracking-[0.5em] animate-pulse">FETCHING_ARCHIVES...</p>
    </div>
  );

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 text-slate-300 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase">
               <Database size={14} /> System / Materials / Archives
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Central <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Archives</span>
            </h1>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-focus-within:border-cyan-500/50 transition-all">
              <Search className="ml-5 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="w-full md:w-80 pl-4 pr-6 py-4 bg-transparent border-none text-white text-sm outline-none focus:ring-0 placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR: COURSE DIRECTORY */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-6 sticky top-32 shadow-2xl">
              <h2 className="px-5 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-6 border-b border-white/5 flex items-center gap-2">
                <Box size={12} className="text-cyan-500" /> Source_Index
              </h2>
              
              <nav className="space-y-3">
                {uniqueCourses.map((courseTitle) => (
                  <div key={courseTitle} className="space-y-2">
                    <button 
                      onClick={() => handleCourseClick(courseTitle)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                        activeCourse === courseTitle 
                        ? 'bg-cyan-500 text-[#020617] shadow-[0_0_25px_rgba(34,211,238,0.3)]' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Terminal size={16} />
                        <span className="truncate w-36 text-left">{courseTitle}</span>
                      </div>
                      {courseTitle !== "Semua" && (
                        <ChevronRight size={14} className={`transition-transform ${openDropdown === courseTitle ? 'rotate-90' : ''}`} />
                      )}
                    </button>

                    {openDropdown === courseTitle && courseTitle !== "Semua" && (
                      <div className="ml-6 pl-4 border-l border-white/5 space-y-2 py-3 animate-in slide-in-from-top-2 duration-300">
                        {materials
                          .filter(m => m.course?.title === courseTitle)
                          .map((m) => (
                            <div key={m.id} className="text-[10px] font-mono text-slate-600 flex items-center gap-3 py-1 hover:text-cyan-400 transition-colors">
                              <FileText size={12} /> {m.title.substring(0, 20)}...
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN GRID: MATERIAL NODES */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
              {filteredMaterials.map((item) => (
                <div key={item.id} className="group relative bg-white/[0.02] rounded-[3rem] p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-3 shadow-2xl overflow-hidden">
                  
                  {/* Decorative Scanline Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/[0.02] to-transparent h-20 w-full -translate-y-full group-hover:translate-y-[400%] transition-transform duration-[2000ms] pointer-events-none"></div>

                  <Link to={`/materi/${item.id}`} className="relative aspect-video rounded-[2rem] overflow-hidden mb-8 bg-[#020617] border border-white/5 block">
                    <img 
                      src={item.image ? `http://localhost:8000/storage/${item.image}` : "https://via.placeholder.com/400x225"} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[#020617]/40 backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-[#020617] shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                        <PlayCircle size={32} fill="currentColor" />
                      </div>
                    </div>
                  </Link>

                  <div className="px-3">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-cyan-400 rounded-full tracking-tighter">
                        NODE_{item.id.toString().padStart(3, '0')}
                      </span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest truncate max-w-[150px]">
                        {item.course?.title || "CORE_SYSTEM"}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors line-clamp-1 tracking-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                         <span className="text-[8px] font-mono text-slate-600 uppercase">Sequence_Order</span>
                         <span className="text-xs font-bold text-slate-400">#00{item.order || 0}</span>
                      </div>
                      
                      <Link 
                        to={`/materi/${item.id}`} 
                        className="flex items-center gap-3 text-[#020617] font-black text-[9px] bg-white hover:bg-cyan-400 px-6 py-3 rounded-full transition-all tracking-[0.2em] uppercase"
                      >
                        READ_DOCS <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredMaterials.length === 0 && (
              <div className="text-center py-32 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Database size={24} className="text-slate-700" />
                </div>
                <p className="text-slate-600 font-mono text-xs tracking-widest animate-pulse">
                   // ERROR_404: NO_DOCUMENTATION_IN_BRANCH
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}