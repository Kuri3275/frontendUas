import Card from "../../components/public/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 py-48 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight">
          Platform Belajar <br />
          <span className="text-indigo-500">Mudah & Modern</span>
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
          Belajar coding, desain, dan teknologi dengan materi terstruktur,
          mudah dipahami, dan cocok untuk pemula yang ingin berkembang
          secara konsisten.
        </p>

        <div className="flex justify-center gap-6">
          <button className="px-10 py-4 bg-indigo-600 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300">
            Mulai Belajar
          </button>
          <button className="px-10 py-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition duration-300">
            Lihat Materi
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <h2 className="text-4xl font-bold text-indigo-500 mb-4">120+</h2>
            <p className="text-gray-400 text-lg">Materi</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-indigo-500 mb-4">5.000+</h2>
            <p className="text-gray-400 text-lg">Pelajar</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-indigo-500 mb-4">24/7</h2>
            <p className="text-gray-400 text-lg">Akses</p>
          </div>
        </div>
      </section>

      {/* MATERI */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Materi Populer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <Card title="HTML Dasar" desc="Pahami struktur website dari nol" />
          <Card title="CSS Dasar" desc="Bikin tampilan website lebih menarik" />
          <Card title="JavaScript" desc="Tambah logika & interaksi dinamis" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Siap Mulai Belajar?
        </h2>
        <p className="mb-12 text-lg">
          Tingkatkan skill dan bangun masa depanmu hari ini
        </p>
        <button className="bg-white text-indigo-600 px-12 py-4 rounded-xl font-semibold hover:bg-gray-200 transition duration-300">
          Daftar Gratis
        </button>
      </section>

    </div>
  );
}