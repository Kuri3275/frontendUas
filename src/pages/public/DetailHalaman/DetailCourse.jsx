import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, HelpCircle, FileText, Terminal, ArrowLeft, Loader2, 
  Play, Lock, ShieldCheck, Zap, Cpu, Activity, Globe
} from "lucide-react";
import Swal from "sweetalert2";

// IMPORT SERVICE
import materiService from "../../../api/user/materi.service";
import quizService from "../../../api/user/quiz.service";
import enrollService from "../../../api/user/enroll.service";

export default function DetailCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materiList, setMateriList] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resEnroll = await enrollService.getMyCourses();
        if (resEnroll.data.success) {
          const alreadyEnrolled = resEnroll.data.data.some(
            (item) => String(item.course_id) === String(id)
          );
          setIsEnrolled(alreadyEnrolled);
        }

        const resMateri = await materiService.getAllMaterials();
        if (resMateri.data.success) {
          const allM = resMateri.data.data.data || resMateri.data.data || [];
          const filteredM = allM.filter(m => String(m.course_id) === String(id));
          setMateriList(filteredM.sort((a, b) => a.order - b.order));
          if (filteredM.length > 0) setCourseInfo(filteredM[0].course);
        }

        const resQuiz = await quizService.getAllQuizzes();
        if (resQuiz.data.success) {
          const allQ = resQuiz.data.data.data || resQuiz.data.data || [];
          const filteredQ = allQ.filter(q => String(q.course_id) === String(id));
          setQuizList(filteredQ);
        }
      } catch (err) {
        console.error("Gagal load data detail course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      const res = await enrollService.enrollCourse(id);
      if (res.data.success) {
        setIsEnrolled(true);
        Swal.fire({
          icon: 'success',
          title: 'ACCESS GRANTED',
          text: 'Data decrypted successfully. Modules unlocked.',
          background: '#020617',
          color: '#22d3ee',
          confirmButtonColor: '#0891b2',
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Encryption Failed";
      Swal.fire({ icon: 'error', title: 'ACCESS DENIED', text: msg, background: '#020617', color: '#f43f5e' });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-cyan-400">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin"></div>
        </div>
        <span className="animate-pulse tracking-[0.5em] text-[10px] uppercase">Decrypting_Course_Data...</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 text-slate-300 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <Link to="/course" className="inline-flex items-center gap-3 text-slate-500 hover:text-cyan-400 font-mono text-[9px] tracking-[0.3em] uppercase mb-12 transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> [ Back_to_system_hub ]
        </Link>

        {/* HERO SECTION - GAYA BENTO MODERN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Main Module Display */}
          <div className="lg:col-span-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-14 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <Cpu size={120} className="text-cyan-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-bold tracking-[0.3em] rounded-full uppercase">
                  Classified_Module_{id}
                </span>
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_cyan]"></div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white uppercase leading-none mb-6 tracking-tight">
                {courseInfo?.title || "Unknown Track"}
              </h1>
              <p className="text-slate-500 font-mono text-xs tracking-relaxed max-w-xl leading-relaxed">
                // System Description: Deep-dive analysis and architectural implementation of 
                modern {courseInfo?.category?.name || "Development"} protocols. Execute learning sequence to proceed.
              </p>
            </div>
          </div>

          {/* Action & Status Card */}
          <div className="lg:col-span-4 bg-cyan-500 rounded-[3rem] p-10 text-[#020617] flex flex-col justify-between relative overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <Zap className="absolute -right-4 -top-4 opacity-20 w-40 h-40 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            
            <div className="relative z-10">
               <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase font-bold opacity-60 mb-2">Access_Protocol</h3>
               <p className="text-3xl font-black uppercase tracking-tighter">
                 {isEnrolled ? "Authorized" : "Locked"}
               </p>
            </div>

            <button 
              disabled={enrolling}
              onClick={isEnrolled ? () => navigate(`/materi/${materiList[0]?.id}`) : handleEnroll}
              className={`relative z-10 w-full py-5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-2
                ${isEnrolled 
                  ? "bg-[#020617] text-white hover:bg-slate-900" 
                  : "bg-white text-cyan-600 hover:bg-slate-100"}`}
            >
              {enrolling ? <Loader2 className="animate-spin" size={16} /> : (isEnrolled ? "Execute_Sequence" : "Initialize_Access")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: CONTENT LIST */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* MODULES */}
            <section>
              <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-white font-bold flex items-center gap-4 tracking-[0.3em] uppercase text-[10px]">
                  <Activity size={16} className="text-cyan-500" /> System_Units
                </h2>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">{materiList.length} Nodes detected</span>
              </div>

              <div className="space-y-3">
                {materiList.map((materi, index) => (
                  <Link 
                    key={materi.id}
                    to={isEnrolled ? `/materi/${materi.id}` : "#"}
                    onClick={(e) => !isEnrolled && e.preventDefault()}
                    className={`group flex items-center justify-between p-7 rounded-[2rem] border transition-all duration-500
                      ${isEnrolled 
                        ? "bg-white/[0.02] border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.05] hover:translate-x-2" 
                        : "bg-white/[0.01] border-white/5 opacity-40 cursor-not-allowed"}`}
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-[10px] text-cyan-500/50 group-hover:text-cyan-400 transition-colors">0{index + 1}</span>
                      <h4 className={`text-sm font-bold tracking-wide transition-colors ${isEnrolled ? "text-slate-200 group-hover:text-white" : "text-slate-500"}`}>
                        {materi.title}
                      </h4>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isEnrolled ? "border-cyan-500/20 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-[#020617]" : "border-white/5 text-slate-700"}`}>
                      {isEnrolled ? <Play size={14} fill="currentColor" /> : <Lock size={14} />}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* QUIZ SECTION */}
            <section>
              <h2 className="text-white font-bold flex items-center gap-4 tracking-[0.3em] uppercase text-[10px] mb-8 px-4">
                <ShieldCheck size={16} className="text-emerald-500" /> Validation_Gateways
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizList.map((quiz) => (
                  <div key={quiz.id} className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${isEnrolled ? "bg-white/[0.02] border-white/10 hover:border-emerald-500/40" : "bg-white/[0.01] border-dashed border-white/5"}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                            <HelpCircle size={20} />
                        </div>
                        <span className="text-[8px] font-mono text-slate-600 uppercase">Ver_0.{quiz.id}</span>
                    </div>
                    <h4 className="text-white font-bold uppercase text-sm mb-2 tracking-wider">{quiz.title}</h4>
                    <p className="text-[10px] font-mono text-slate-500 mb-8 uppercase">Integrity Check Required</p>
                    <Link 
                      to={isEnrolled ? `/quiz/${quiz.id}` : "#"}
                      className={`block text-center py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all
                        ${isEnrolled 
                          ? "bg-emerald-500 text-[#020617] hover:bg-emerald-400" 
                          : "bg-white/5 text-slate-600 cursor-not-allowed"}`}
                    >
                      {isEnrolled ? "Initiate_Test" : "Gateway_Locked"}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: SYSTEM LOGS / STATS */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sticky top-32 shadow-2xl">
              <h3 className="text-white font-bold mb-10 flex items-center gap-3 uppercase text-[9px] tracking-[0.3em]">
                <Globe size={14} className="text-cyan-500" /> Network_Status
              </h3>
              
              <div className="space-y-4 mb-10">
                <div className="p-5 bg-[#020617] rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[8px] font-mono text-slate-600 uppercase mb-1">Total_Modules</p>
                    <p className="text-2xl font-bold text-white">{materiList.length}</p>
                  </div>
                  <FileText className="text-slate-800" size={32} />
                </div>
                <div className="p-5 bg-[#020617] rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[8px] font-mono text-slate-600 uppercase mb-1">Gateways</p>
                    <p className="text-2xl font-bold text-emerald-500">{quizList.length}</p>
                  </div>
                  <ShieldCheck className="text-slate-800" size={32} />
                </div>
              </div>

              <div className="space-y-2 mb-10">
                 <div className="flex items-center justify-between text-[9px] font-mono p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-500 uppercase">Sync_Status</span>
                    <span className={isEnrolled ? "text-cyan-400 font-bold" : "text-amber-500 font-bold"}>
                      {isEnrolled ? "ONLINE" : "OFFLINE"}
                    </span>
                 </div>
                 <div className="flex items-center justify-between text-[9px] font-mono p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-500 uppercase">Encryption</span>
                    <span className="text-cyan-400 font-bold italic">AES-256</span>
                 </div>
              </div>

              <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-[2rem] relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                       <Terminal size={14} className="text-cyan-500" />
                       <span className="text-[9px] font-black uppercase text-cyan-400">Security_Log</span>
                    </div>
                    <p className="text-[9px] text-slate-500 leading-relaxed font-mono">
                      User_ID: {JSON.parse(localStorage.getItem("user"))?.name?.toLowerCase().replace(/\s/g, '_') || "anonymous"}<br/>
                      Access_Level: {isEnrolled ? "Level_01" : "Restricted"}<br/>
                      Loc: Central_Hub_Node_04
                    </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}