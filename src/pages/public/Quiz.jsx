import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  HelpCircle, Zap, Timer, ArrowRight, 
  Terminal, LayoutGrid, Search, BookOpen 
} from "lucide-react";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchQuizzes();
  }, [selectedCat]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const url = selectedCat 
        ? `http://localhost:8000/api/quiz?category_id=${selectedCat}` 
        : "http://localhost:8000/api/quiz";

      const res = await axios.get(url);

      if (res.data.success) {
        setQuizzes(res.data.data.data || []);
        setPagination(res.data.data);
      }
    } catch (err) {
      console.error("Gagal load quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-emerald-300 font-mono italic animate-pulse">
        SYNCHRONIZING_QUIZ_DATABASE...
      </p>
    </div>
  );

  return (
    <div className="bg-[#0F172A] min-h-screen pt-32 pb-20 text-slate-200 font-sans">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs mb-3">
              <Terminal size={14} />
              <span>SYSTEM_EVALUATION_MODULE_V1.0</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter">
              Skill <span className="text-emerald-500">Assessment</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-[#1E293B] p-2 rounded-2xl border border-slate-800">
            <button 
              onClick={() => setSelectedCat(null)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                !selectedCat ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'
              }`}
            >
              ALL_DEVICES
            </button>
            <button 
              onClick={() => setSelectedCat(1)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                selectedCat === 1 ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'
              }`}
            >
              FRONTEND
            </button>
            <button 
              onClick={() => setSelectedCat(2)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                selectedCat === 2 ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'
              }`}
            >
              BACKEND
            </button>
          </div>
        </div>

        {/* QUIZ GRID */}
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id}
                className="group relative bg-[#1E293B]/50 border border-slate-800 rounded-[35px] p-8 hover:bg-[#1E293B] hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-500">
                  <LayoutGrid size={80} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                      <Zap size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      {quiz.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {quiz.title}
                  </h3>

                  <p className="text-slate-500 text-xs mb-8 font-mono italic">
                    {`// Ref: ${quiz.course?.title || "Standalone Assessment"}`}
                  </p>

                  <div className="flex items-center gap-6 mb-8 border-t border-slate-800 pt-6">
                    <div>
                      <span className="text-[10px] text-slate-600 font-bold uppercase">Duration</span>
                      <div className="flex items-center gap-1.5 text-emerald-500 font-mono text-sm">
                        <Timer size={14} />
                        {quiz.time_limit_minutes ? `${quiz.time_limit_minutes}M` : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 font-bold uppercase">Difficulty</span>
                      <div className="flex items-center gap-1.5 text-amber-500 font-mono text-sm">
                        <HelpCircle size={14} /> MED
                      </div>
                    </div>
                  </div>

                  {/* 🔥 FIX UTAMA DI SINI */}
                  <Link
                    to={`/quiz/${quiz.id}`}
                    state={{ courseId: quiz.course_id }}
                    className="flex items-center justify-between w-full p-4 bg-slate-900 group-hover:bg-emerald-600 rounded-2xl transition-all duration-300"
                  >
                    <span className="font-black text-[11px] tracking-widest text-white">
                      EXECUTE_TEST
                    </span>
                    <ArrowRight size={18} className="text-emerald-500 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-800 rounded-[50px]">
            <Search size={48} className="text-slate-700 mb-4" />
            <p className="text-slate-500 font-mono uppercase italic">
              No_Quiz_Packages_Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
