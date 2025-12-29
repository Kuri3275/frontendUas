import React from "react";
import { Target, Users, ShieldCheck, Rocket } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Siswa Terdaftar", value: "10,000+" },
    { label: "Kursus Tersedia", value: "50+" },
    { label: "Mentor Ahli", value: "20+" },
    { label: "Alumni Bekerja", value: "85%" },
  ];

  return (
    <div className="bg-white">
      {/* HERO SECTION ABOUT */}
      <section className="relative py-24 bg-indigo-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Mencetak Talenta Digital <br /> Masa Depan Indonesia
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto leading-relaxed">
            ExcelLearn hadir sebagai jembatan bagi siapa saja yang ingin menguasai teknologi, 
            tanpa terbatas latar belakang pendidikan. Kami percaya semua orang berhak untuk "Excel".
          </p>
        </div>
        {/* Dekorasi BG */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -ml-20 -mt-20"></div>
      </section>

      {/* VISI & MISI */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 underline decoration-indigo-500 decoration-4 underline-offset-8">
              Misi Kami
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Kami tidak hanya sekadar memberikan tutorial. Kami membangun ekosistem 
              pembelajaran yang terarah dengan kurikulum yang disesuaikan dengan 
              kebutuhan industri saat ini.
            </p>
            <div className="space-y-4">
              {[
                { icon: Target, text: "Menyediakan kurikulum berbasis project nyata." },
                { icon: ShieldCheck, text: "Menjamin kualitas materi dari praktisi berpengalaman." },
                { icon: Rocket, text: "Membantu akselerasi karier lulusan ke dunia kerja." },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <item.icon className="text-indigo-600" size={24} />
                  <span className="font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-indigo-100 rounded-[40px] rotate-3 absolute inset-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
              alt="Team Work" 
              className="relative z-10 rounded-[40px] aspect-square object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-extrabold text-indigo-600 mb-2">{stat.value}</p>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold mb-16">Kenapa Belajar Bersama Kami?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold">Komunitas Inklusif</h3>
            <p className="text-gray-500">Tanya jawab dan diskusi langsung dengan ribuan siswa lainnya.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold">Sertifikat Resmi</h3>
            <p className="text-gray-500">Dapatkan sertifikat kompetensi setelah menyelesaikan kelas.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket size={32} />
            </div>
            <h3 className="text-xl font-bold">Update Berkala</h3>
            <p className="text-gray-500">Materi selalu diperbarui mengikuti tren teknologi terbaru.</p>
          </div>
        </div>
      </section>
    </div>
  );
}