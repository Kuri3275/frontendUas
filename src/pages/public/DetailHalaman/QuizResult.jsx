import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import quizResultService from "../../../api/user/quizResult.service";
import { 
  Trophy, CheckCircle, XCircle, 
  ArrowLeft, User, BarChart3, RotateCcw,
  Terminal, ShieldCheck
} from "lucide-react";

export default function QuizResult() {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizResultService
      .getMyResults()
      .then((res) => {
        const results = res.data.data ?? [];
        const found = results.find((r) => r.quiz_id === Number(quizId));
        setResult(found);
      })
      .catch(() => console.error("FAILED_TO_LOAD_DATA_STREAM"))
      .finally(() => setLoading(false));
  }, [quizId]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-emerald-500 font-mono">
      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
      <span className="text-[10px] tracking-[0.4em] animate-pulse">GENERATING_REPORT...</span>
    </div>
  );

  if (!result) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-rose-500 font-mono">
      <Terminal size={40} className="mb-4 opacity-20" />
      <p className="text-xs tracking-widest uppercase">Result_Not_Found_In_Registry</p>
      <Link to="/quiz" className="mt-6 text-slate-500 hover:text-white underline text-[10px]">Back_to_Safety</Link>
    </div>
  );

  const isPassed = result.score >= 70; // Contoh ambang batas lulus

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] opacity-10 pointer-events-none rounded-full ${isPassed ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* REPORT CARD */}
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl text-center">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-8">
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl ${isPassed ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
              {isPassed ? <Trophy size={48} /> : <ShieldCheck size={48} className="opacity-50" />}
            </div>
          </div>

          <h1 className="text-sm font-mono tracking-[0.5em] text-slate-500 uppercase mb-2">
            Mission_Status: <span className={isPassed ? "text-emerald-500" : "text-rose-500"}>{isPassed ? "SUCCESS" : "INCOMPLETE"}</span>
          </h1>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-12">
            Assessment Report
          </h2>

          {/* MAIN SCORE CIRCLE */}
          <div className="relative inline-flex items-center justify-center mb-16">
             <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="6" fill="transparent" 
                    strokeDasharray={553} 
                    strokeDashoffset={553 - (553 * result.score) / 100}
                    className={`${isPassed ? 'text-emerald-500' : 'text-rose-500'} transition-all duration-1000 ease-out`} 
                />
             </svg>
             <div className="absolute flex flex-col items-center">
                <span className="text-6xl font-black text-white">{result.score}</span>
                <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Final_Grade</span>
             </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col items-center">
                <CheckCircle className="text-emerald-500 mb-2" size={20} />
                <span className="text-2xl font-bold text-white">{result.correct_count}</span>
                <span className="text-[10px] text-slate-600 font-mono uppercase">Correct_Bits</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col items-center">
                <BarChart3 className="text-blue-500 mb-2" size={20} />
                <span className="text-2xl font-bold text-white">{result.total_questions}</span>
                <span className="text-[10px] text-slate-600 font-mono uppercase">Total_Queries</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/quiz" className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-white/5 text-slate-400 font-black text-[10px] tracking-widest uppercase hover:bg-white/5 transition-all">
              <RotateCcw size={16} /> Retry_Sequence
            </Link>

            <Link to="/profile" className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#020617] font-black text-[10px] tracking-widest uppercase hover:bg-cyan-400 transition-all shadow-xl shadow-white/5">
              <User size={16} /> Sync_Profile
            </Link>
          </div>

        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-slate-600 font-mono text-[9px] uppercase tracking-widest">
            Identity_Confirmed: {localStorage.getItem('user_name') || 'AUTHORIZED_ENTITY'} <br/>
            Timestamp: {new Date().toLocaleString()}
        </p>

      </div>
    </div>
  );
}