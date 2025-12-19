import Card from "../components/Card";
import "../style/layout.css";

export default function Home() {
  return (
    <div className="home">
      <section className="banner">
        <h1>Belajar Jadi Lebih Mudah</h1>
        <div className="banner-btn">
          <button className="primary">Mulai Belajar</button>
          <button className="secondary">Coba Quiz</button>
        </div>
      </section>

      <section className="materi">
        <h2>Materi Populer</h2>
        <div className="card-grid">
          <Card title="HTML Dasar" desc="Belajar struktur web" />
          <Card title="CSS Dasar" desc="Styling website" />
          <Card title="JavaScript" desc="Logika interaktif" />
        </div>
      </section>
    </div>
  );
}
