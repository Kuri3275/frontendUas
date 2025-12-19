import Card from "../components/Card";

export default function Home() {
  return (
    <section className="home">
      <div className="banner">
        <h1>Belajar Jadi Lebih Mudah</h1>
        <button>Mulai Belajar</button>
        <button>Coba Quiz</button>
      </div>

      <h2>Materi Populer</h2>
      <div className="card-grid">
        <Card title="HTML Dasar" description="Belajar struktur web" />
        <Card title="CSS Dasar" description="Styling website" />
        <Card title="JavaScript" description="Logika interaktif" />
      </div>
    </section>
  );
}
