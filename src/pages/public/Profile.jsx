import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Settings, LogOut, BookOpen, Award, Terminal, Cpu, Activity } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-cyan-500 font-mono text-[10px] tracking-[0.3em]">FETCHING_IDENTITY...</p>
    </div>
  );

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 px-6 text-slate-300 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* MAIN PROFILE CARD */}
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
          
          {/* Header Visual - Cyber Gradient */}
          <div className="h-40 bg-gradient-to-r from-indigo-900 via-slate-900 to-cyan-900 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
             <div className="absolute bottom-4 left-8 flex items-center gap-2 text-[10px] font-mono text-cyan-400/50 tracking-widest uppercase">
                <Terminal size={12} /> System_Registry_Active
             </div>
          </div>
          
          <div className="px-10 pb-12">
            <div className="relative -mt-20 mb-10 flex flex-col md:flex-row md:items-end gap-8">
              {/* Avatar Frame */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative w-36 h-36 rounded-[2.2rem] bg-[#0F172A] border-4 border-[#020617] flex items-center justify-center text-white shadow-2xl">
                  <User size={70} className="text-slate-700 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-[#020617] flex items-center justify-center text-[#020617]">
                  <Activity size={18} />
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                  {user.name}
                </h1>
                <div className="flex items-center gap-4">
                    <p className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg font-mono text-[10px] font-bold flex items-center gap-2 tracking-widest">
                    <Shield size={12} /> {user.role?.toUpperCase() || "STUDENT"}
                    </p>
                    <p className="text-slate-600 font-mono text-[10px] tracking-widest uppercase">
                      UID: {user.id || 'N/A'}-SEC_ALPHA
                    </p>
                </div>
              </div>

              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all border border-white/5 flex items-center gap-3 active:scale-95">
                <Settings size={16} /> EDIT_CORE_DATA
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="group p-8 bg-white/[0.02] hover:bg-white/[0.04] rounded-[2rem] border border-white/5 transition-all">
                  <p className="text-[10px] text-slate-500 font-mono uppercase mb-4 tracking-widest">Digital_Signature</p>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <Mail size={20} />
                    </div>
                    <span className="text-lg font-medium">{user.email}</span>
                  </div>
                </div>

                <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase mb-2 tracking-widest">Security_Status</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-sm tracking-widest">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                      Verified_Identity
                    </div>
                  </div>
                  <Cpu className="text-slate-800" size={40} />
                </div>
              </div>

              {/* Right Column: Stats Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] group hover:bg-indigo-500/10 transition-all text-center lg:text-left relative overflow-hidden">
                  <BookOpen className="text-indigo-500 mb-4 opacity-50 group-hover:scale-110 transition-transform" size={32} />
                  <p className="text-3xl font-black text-white">12</p>
                  <p className="text-[9px] text-indigo-400/60 uppercase font-mono tracking-widest">Active_Units</p>
                </div>
                <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[2rem] group hover:bg-cyan-500/10 transition-all text-center lg:text-left relative overflow-hidden">
                  <Award className="text-cyan-500 mb-4 opacity-50 group-hover:scale-110 transition-transform" size={32} />
                  <p className="text-3xl font-black text-white">04</p>
                  <p className="text-[9px] text-cyan-400/60 uppercase font-mono tracking-widest">Achievements</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[9px] font-mono text-slate-600 tracking-[0.3em] uppercase">
                System_Access_Level: Priority_User
              </p>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
                className="w-full md:w-auto px-10 py-5 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl font-black text-[10px] transition-all tracking-[0.3em] uppercase flex items-center justify-center gap-3 shadow-xl hover:shadow-rose-500/20"
              >
                <LogOut size={18} /> Terminate_Session
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-10 text-[9px] font-mono text-slate-700 uppercase tracking-[0.5em]">
          End_Of_Encrypted_Profile_Data
        </p>
      </div>
    </div>
  );
}