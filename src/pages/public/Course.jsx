import "../style/layout.css";

export default function Quiz() {
  // Data kuis agar otomatis
  const daftarKuis = [
    { id: 1, judul: "HTML Dasar", soal: 10, waktu: "15 menit", slug: "html", warna: "blue" },
    { id: 2, judul: "CSS Dasar", soal: 10, waktu: "15 menit", slug: "css", warna: "green" },
    { id: 3, judul: "JavaScript Dasar", soal: 15, waktu: "25 menit", slug: "js", warna: "purple" },
  ];

  return (
    <div className="quiz-page-wrapper">
      {/* 1. Header Judul (Di bawah Navbar kamu) */}
      <div className="quiz-header-section">
        <h1>Dashboard Kuis</h1>
        <p>Pantau progres belajarmu di sini</p>
      </div>

      {/* 2. Statistik Ringkas (Gaya Dashboard No 2 tapi di tengah) */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="icon-circle blue">👥</div>
          <div className="stat-text"><span>Users</span> <h3>7</h3></div>
        </div>
        <div className="stat-card">
          <div className="icon-circle green">📚</div>
          <div className="stat-text"><span>Courses</span> <h3>1</h3></div>
        </div>
        <div className="stat-card">
          <div className="icon-circle orange">📄</div>
          <div className="stat-text"><span>Materials</span> <h3>1</h3></div>
        </div>
        <div className="stat-card">
          <div className="icon-circle purple">❓</div>
          <div className="stat-text"><span>Quizzes</span> <h3>1</h3></div>
        </div>
      </div>

      {/* 3. Daftar Kuis (Tampilan No 1 yang dipercantik) */}
      <h2 className="section-title">Pilih Kuis Kamu</h2>
      <div className="quiz-grid">
        {daftarKuis.map((item) => (
          <div key={item.id} className="quiz-card">
            <div className={`card-accent ${item.warna}`}></div>
            <h3>{item.judul}</h3>
            <p>{item.soal} Soal · {item.waktu}</p>
            <button 
              className="btn-mulai" 
              onClick={() => window.location.href = `/tryout?type=${item.slug}`}
            >
              Mulai Kuis
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}