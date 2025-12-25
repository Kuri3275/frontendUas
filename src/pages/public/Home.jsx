import Card from "../../components/public/Card";
import { BookOpen, Users, Rocket } from "lucide-react";
import GambarSiswa from "../../gambar/contoh_1.png";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="w-full text-gray-900">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-36 grid md:grid-cols-2 gap-16 items-center text-white">
          {/* LEFT */}
          <div>
            <span className="inline-block mb-6 text-sm tracking-widest text-indigo-200">
              WELCOME TO
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
              EXCELLEARN <br />
              <span className="text-indigo-200">Learn to Excel.</span>
            </h1>

            <p className="text-indigo-100 text-lg max-w-xl mb-10">
              Program belajar terstruktur untuk membangun karier di dunia IT
              dengan kurikulum modern dan project nyata.
            </p>

            <div className="flex gap-5">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition">
                
                Mulai Belajar
              </button>
              <button
               className="border border-white/40 px-8 py-4 rounded-xl hover:bg-white/10 transition">
                Lihat Materi
              </button>
            </div>
          </div>

          {/* RIGHT (IMAGE / MOCK) */}
          <div className="relative hidden md:block">
            <div className="w-full h-[420px] bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
              <img
                src={GambarSiswa}
                alt="Contoh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-8 grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          <Card
            title="Materi Terstruktur"
            desc="Belajar dari dasar sampai siap kerja"
          />

          <Card
            title="Mentor Berpengalaman"
            desc="Dipandu praktisi industri IT"
          />

          <Card title="Project Nyata" desc="Bangun portfolio selama belajar" />

          <Card
            title="Materi Terstruktur"
            desc="Belajar dari dasar sampai siap kerja."
            icon={BookOpen} // Kirim ikon di sini
          />
          <Card
            title="Materi Terstruktur"
            desc="Belajar dari dasar sampai siap kerja."
            icon={BookOpen} // Kirim ikon di sini
          />
          <Card
            title="Materi Terstruktur"
            desc="Belajar dari dasar sampai siap kerja."
            icon={BookOpen} // Kirim ikon di sini
          />
        </div>
      </section>

      {/* SECTION: PROGRAM INI COCOK UNTUK */}
      <section className="bg-indigo-900 py-24 text-white overflow-hidden relative">
        {/* Variasi Cahaya (Glow) di Background agar tidak sepi */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* KOLOM KIRI: Judul & Daftar Target Audiens */}
          <div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Siapa yang Harus <br />
              <span className="text-indigo-400">Bergabung di ExcelLearn?</span>
            </h2>
            <p className="text-indigo-100/80 text-lg mb-8 leading-relaxed">
              Kami merancang kurikulum yang fleksibel namun tetap berbobot,
              cocok bagi siapa saja yang ingin serius berkarier di industri
              teknologi.
            </p>

            {/* List dengan Ikon Checklist */}
            <div className="space-y-4">
              {[
                "Mahasiswa yang ingin menguasai skill praktis",
                "Fresh Graduate yang sedang mencari kerja",
                "Karyawan yang ingin switch career ke IT",
                "Freelancer yang ingin naik level ke profesional",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-indigo-50 font-medium group-hover:translate-x-1 transition-transform">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

              {/* PROGRAM INFO */}
          {/* KOLOM KANAN: Box "Yang Akan Dipelajari" (Modern Grid) */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Keahlian yang Akan Kamu Kuasai
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Frontend Dev",
                "Backend Dev",
                "UI/UX Design",
                "Database",
                "Git & GitHub",
                "Deployment",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-indigo-600/40 hover:border-indigo-400/50 transition-all cursor-default text-center"
                >
                  <p className="text-sm font-semibold text-indigo-100">
                    {skill}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              Lihat Detail Course Lengkap
            </button>
          </div>
        </div>
      </section>

      

    </div>
  );
}
