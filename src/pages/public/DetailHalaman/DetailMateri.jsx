import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Terminal, BookOpen, Layout, 
  ArrowRight, ArrowLeft, Loader2, AlertCircle, Hash, Clock
} from "lucide-react";
import materiService from "../../../api/user/materi.service";

export default function MateriDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);
  const [allMaterials, setAllMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await materiService.getMaterialById(id); 
        if (res.data.success) {
          const currentData = res.data.data;
          setMateri(currentData);
          
          const resList = await materiService.getAllMaterials();
          if (resList.data.success) {
            const dataList = resList.data.data.data || resList.data.data || [];
            const filtered = dataList.filter(m => m.course_id === currentData.course_id);
            setAllMaterials(filtered.sort((a, b) => a.order - b.order));
          }
        }
      } catch (err) {
        console.error("Error fetching detail materi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const currentIndex = allMaterials.findIndex(m => m.id === parseInt(id));
  const prevMateri = allMaterials[currentIndex - 1];
  const nextMateri = allMaterials[currentIndex + 1];

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-cyan-500 font-mono">
      <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
      </div>
      <span className="animate-pulse tracking-[0.5em] text-[10px]">ACCESSING_STREAMS_ID_{id}...</span>
    </div>
  );

  return (
    <div className="bg-[#020617] min-h-screen pt-28 pb-20 text-slate-300 selection:bg-cyan-500/30 selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* MAIN CONTENT AREA */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb - Terminal Style */}
            <div className="flex items-center gap-4 mb-10 text-[10px] font-mono tracking-widest uppercase opacity-60">
              <Link to="/materi" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
                <ChevronLeft size={14} /> [ materials ]
              </Link>
              <span className="text-slate-800">/</span>
              <span className="truncate">{materi?.course?.title?.replace(/\s+/g, '_')}</span>
              <span className="text-slate-800">/</span>
              <span className="text-cyan-400 font-bold">{materi?.title?.replace(/\s+/g, '_')}.data</span>
            </div>

            {/* Reading Container */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
              {/* Material Header */}
              <div className="p-10 lg:p-16 border-b border-white/5 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent">
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-bold tracking-[0.3em] uppercase">
                        Sequence_0{materi?.order || '0'}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px]">
                        <Clock size={12} /> 12 MIN READ
                    </div>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                  {materi?.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/5 text-slate-400">
                    <Layout size={14} className="text-cyan-500" />
                    <span className="tracking-wide uppercase text-[10px] font-bold">{materi?.course?.title}</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/5 text-slate-400">
                    <Terminal size={14} className="text-cyan-500" />
                    <span className="font-mono text-[10px] text-cyan-400/70">ID: {id}</span>
                  </div>
                </div>
              </div>

              {/* Body Materi */}
              <div className="p-10 lg:p-16">
                {/* Hero Image */}
                {materi?.image && (
                  <div className="mb-16 group rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                    <img 
                      src={`http://localhost:8000/storage/${materi.image}`} 
                      alt="Data Visualization" 
                      className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                )}

                {/* Content Render - Markdown Style */}
                <div className="prose prose-invert prose-cyan max-w-none 
                  prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-lg prose-p:font-light
                  prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-cyan-500 prose-h2:pl-6 prose-h2:mt-12
                  prose-code:text-cyan-300 prose-code:bg-cyan-500/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-strong:text-white prose-li:text-slate-400 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-cyan-500/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl">
                  <div dangerouslySetInnerHTML={{ __html: materi?.content }} />
                </div>
              </div>

              {/* Bottom Navigation Nodes */}
              <div className="p-10 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row gap-6 justify-between items-center">
                {prevMateri ? (
                  <button 
                    onClick={() => navigate(`/materi/${prevMateri.id}`)}
                    className="w-full sm:w-auto flex items-center gap-5 p-4 pr-8 rounded-[2rem] bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#020617] flex items-center justify-center group-hover:text-cyan-400 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] text-slate-600 font-mono tracking-widest uppercase mb-1">Previous_Node</p>
                      <p className="text-sm font-bold truncate max-w-[200px]">{prevMateri.title}</p>
                    </div>
                  </button>
                ) : <div />}

                {nextMateri ? (
                  <button 
                    onClick={() => navigate(`/materi/${nextMateri.id}`)}
                    className="w-full sm:w-auto flex items-center gap-5 p-4 pl-8 rounded-[2rem] bg-cyan-500 text-[#020617] hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)] group"
                  >
                    <div className="text-right">
                      <p className="text-[9px] text-cyan-900/60 font-mono tracking-widest uppercase mb-1">Next_Node</p>
                      <p className="text-sm font-black truncate max-w-[200px]">{nextMateri.title}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#020617] flex items-center justify-center text-white">
                        <ArrowRight size={20} />
                    </div>
                  </button>
                ) : <div />}
              </div>
            </div>
          </div>

          {/* SIDEBAR: NAVIGATION CLOUD */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/5 p-8 sticky top-28 shadow-2xl">
              <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500">
                      <Hash size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-white uppercase tracking-widest">Syllabus</h3>
                      <p className="text-[9px] text-slate-600 font-mono tracking-tighter">DATA_STRUCTURE_V.2</p>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-cyan-500/50">
                    {currentIndex + 1} / {allMaterials.length}
                </div>
              </div>

              <div className="space-y-3">
                {allMaterials.map((item, index) => (
                  <Link 
                    key={item.id}
                    to={`/materi/${item.id}`}
                    className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      item.id === parseInt(id)
                      ? 'bg-cyan-500 text-[#020617] shadow-xl'
                      : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    <div className={`text-[10px] font-mono font-bold w-6 ${
                      item.id === parseInt(id) ? 'text-cyan-900' : 'text-slate-700 group-hover:text-cyan-500'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`text-[11px] font-bold truncate tracking-tight uppercase ${item.id === parseInt(id) ? 'font-black' : ''}`}>
                        {item.title}
                      </p>
                    </div>
                    {item.id === parseInt(id) && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30"></div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex justify-between text-[9px] font-mono mb-3 text-slate-500">
                    <span>PROGRESS_STATUS</span>
                    <span>{Math.round(((currentIndex + 1) / allMaterials.length) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-cyan-500 shadow-[0_0_10px_cyan] transition-all duration-1000"
                        style={{ width: `${((currentIndex + 1) / allMaterials.length) * 100}%` }}
                    ></div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}