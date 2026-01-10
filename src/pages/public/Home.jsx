import { BookOpen, Users, Rocket, ChevronRight, Share2, Info } from "lucide-react";
import GambarSiswa from "../../gambar/student3nobg.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full bg-[#030b1a] text-white min-h-screen font-sans selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION (TOP PART) --- */}
      <section className="relative min-h-[90vh] flex items-center px-8 pt-20">
        {/* Glow Effects (Ubur-ubur style light) */}
        <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center z-10">
          {/* Kiri: Teks & Info */}
          <div className="space-y-6">
            <div className="flex gap-4 text-xs font-mono text-cyan-400/70">
              <span>039</span> <span>215</span> <span>SS20</span> <span>95.0</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Theme of the <span className="text-cyan-400">Seeth</span>
            </h1>
            
            <p className="max-w-md text-slate-400 leading-relaxed text-sm">
              Program belajar terstruktur untuk membangun karier di dunia IT 
              dengan kurikulum modern dan project nyata yang dirancang khusus 
              untuk masa depan digital.
            </p>

            {/* Pagination Dots Style */}
            <div className="flex gap-2 py-4">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-800"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-800"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]"></div>
            </div>
          </div>

          {/* Kanan: Floating Illustration (Ubur-ubur Placeholder) */}
          <div className="hidden md:flex justify-end relative">
             <div className="w-80 h-80 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-full blur-3xl absolute opacity-50"></div>
             <img 
               src={GambarSiswa} 
               alt="Hero" 
               className="relative z-10 w-full max-w-md drop-shadow-[0_0_50px_rgba(34,211,238,0.2)]"
             />
          </div>
        </div>
      </section>

      {/* --- MIDDLE SECTION (THE ARCH / LORONG) --- */}
      <section className="relative -mt-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-end">
          
          {/* Left Feature Card */}
          <div className="space-y-4 pb-10">
            <h2 className="text-3xl font-bold">Usiwen Deépes</h2>
            <p className="text-sm text-slate-500 max-w-xs">
              Mulai langkah pertamamu dengan fundamental yang kuat dan bimbingan mentor profesional.
            </p>
            <div className="w-full h-64 bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Glow mini */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-400/10 blur-2xl"></div>
                <img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&w=400" className="w-full h-full object-cover opacity-60" alt="tech" />
            </div>
          </div>

          {/* CENTER: THE ARCH (Lorong Visual) */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-t from-cyan-500 to-transparent rounded-t-[10rem] blur opacity-20 group-hover:opacity-40 transition"></div>
             <div className="relative bg-[#030b1a] rounded-t-[12rem] border-t border-x border-cyan-500/30 overflow-hidden h-[450px] flex flex-col items-center justify-end p-8">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030b1a] via-transparent to-transparent"></div>
                
                {/* Arch Internal Detail */}
                <div className="z-10 text-center space-y-4">
                    <div className="w-1 h-20 bg-gradient-to-b from-cyan-500/50 to-transparent mx-auto"></div>
                    <button className="px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-xs hover:bg-white/10 transition">
                        Explore Deep Learning
                    </button>
                </div>
             </div>
          </div>

          {/* Right Feature Card */}
          <div className="space-y-4 pb-10">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]"></div>
                <h2 className="text-xl font-semibold">Prothetic Priveres</h2>
            </div>
            <p className="text-sm text-slate-500">
               Kurikulum yang dirancang untuk kebutuhan industri masa kini.
            </p>
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                    <div className="text-4xl font-bold text-slate-700">5 <span className="text-sm block text-slate-500 uppercase tracking-widest mt-1">Hleriver</span></div>
                    <Share2 className="text-slate-500 w-5 h-5 cursor-pointer hover:text-white" />
                </div>
                <div className="w-32 h-32 bg-cyan-500/10 blur-3xl absolute -bottom-10 -right-10"></div>
                <p className="text-xs text-slate-400 leading-relaxed">
                   Dapatkan akses eksklusif ke komunitas developer terbesar di Indonesia.
                </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- GRID SKILLS (BAWAH) --- */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Frontend", "Backend", "Mobile", "DevOps"].map((skill, idx) => (
                    <div key={idx} className="group cursor-pointer bg-white/[0.02] border border-white/5 p-8 rounded-xl hover:bg-cyan-500/5 hover:border-cyan-500/40 transition-all text-center">
                        <span className="text-slate-500 group-hover:text-cyan-400 font-mono text-xs block mb-2">MODULE 0{idx+1}</span>
                        <h4 className="font-bold tracking-widest uppercase text-sm">{skill}</h4>
                    </div>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
}