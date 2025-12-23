import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css'; 

// --- 1. NAVBAR ---
const Navbar = () => (
  <nav className="navbar">
    <div className="logo">E-Learning</div>
    <div className="menu">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "link")}>Home</NavLink>
      <NavLink to="/blog" className={({ isActive }) => (isActive ? "active-link" : "link")}>Blog</NavLink>
      <NavLink to="/quiz" className={({ isActive }) => (isActive ? "active-link" : "link")}>Tryout</NavLink>
      <NavLink to="/course" className={({ isActive }) => (isActive ? "active-link" : "link")}>Course</NavLink>
    </div>
    <div className="search-profile">
      <input type="text" placeholder="Cari..." className="search-input" />
      <button className="btn-profil">Profil</button>
    </div>
  </nav>
);

// --- 2. FOOTER MENONJOL (Gelap) ---
const Footer = () => (
  <footer style={{
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: '40px 0',
    textAlign: 'center',
    marginTop: 'auto',
    width: '100%',
    borderTop: '4px solid #5D5FEF'
  }}>
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>E-Learning Platform</h3>
      <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>© 2024 E-Learning Quiz. Semangat Belajarnya! </p>
    </div>
  </footer>
);

// --- 3. HALAMAN QUIZ (KOTAK LEBAR KE SAMPING) ---
const QuizPage = () => {
  return (
    <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto', padding: '120px 0' }}>
      
      {/* Breadcrumbs */}
      <nav style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>
        Home / <span style={{ color: '#5D5FEF', fontWeight: 'bold' }}>Tryout</span>
      </nav>

      <h1 style={{ fontSize: '40px', fontWeight: 'extrabold', margin: '0' }}>QUIZZES</h1>
      <p style={{ color: '#666', marginBottom: '50px' }}>Pantau progres belajarmu di sini</p>

      <h2 style={{ fontSize: '26px', marginBottom: '30px' }}>Pilih Kuis Kamu</h2>

      {/* Grid 3 Kolom - Diatur agar kotak lebar ke samping */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px' 
      }}>
        
        {/* Card HTML Dasar */}
        <div className="card-kuis border-html" style={cardWideStyle}>
          <div style={badgeRowStyle}>
            <span style={badgeSelesai}>Selesai</span>
            <span style={{ fontSize: '12px', color: '#888' }}>Skor: 85/100</span>
          </div>
          <div style={{ padding: '0 25px 25px 25px' }}>
            <h3 style={{ fontSize: '22px', margin: '0' }}>HTML Dasar</h3>
            <p style={{ color: '#666', margin: '10px 0 20px 0' }}>10 Soal . 15 menit</p>
            <button className="btn-mulai" style={{ width: '100%', padding: '12px' }}>Mulai Lagi</button>
          </div>
        </div>

        {/* Card CSS Dasar */}
        <div className="card-kuis border-css" style={cardWideStyle}>
          <div style={badgeRowStyle}>
             <span style={{ fontSize: '12px', color: '#aaa', marginLeft: 'auto' }}>Belum dikerjakan</span>
          </div>
          <div style={{ padding: '0 25px 25px 25px' }}>
            <h3 style={{ fontSize: '22px', margin: '0' }}>CSS Dasar</h3>
            <p style={{ color: '#666', margin: '10px 0 20px 0' }}>10 Soal . 15 menit</p>
            <button className="btn-mulai" style={{ width: '100%', padding: '12px' }}>Mulai Kuis</button>
          </div>
        </div>

        {/* Card JS Dasar */}
        <div className="card-kuis border-js" style={cardWideStyle}>
          <div style={badgeRowStyle}>
             <span style={{ fontSize: '12px', color: '#aaa', marginLeft: 'auto' }}>Belum dikerjakan</span>
          </div>
          <div style={{ padding: '0 25px 25px 25px' }}>
            <h3 style={{ fontSize: '22px', margin: '0' }}>JavaScript Dasar</h3>
            <p style={{ color: '#666', margin: '10px 0 20px 0' }}>15 Soal . 25 menit</p>
            <button className="btn-mulai" style={{ width: '100%', padding: '12px' }}>Mulai Kuis</button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLING KHUSUS AGAR KOTAK LEBAR (LANDSCAPE) ---
const cardWideStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  height: '240px', // Tinggi dikunci agar kotak melebar ke samping
  justifyContent: 'space-between',
  overflow: 'hidden'
};

const badgeRowStyle = {
  display: 'flex', 
  justifyContent: 'space-between', 
  padding: '15px 25px'
};

const badgeSelesai = {
  backgroundColor: '#D1FAE5', 
  color: '#065F46', 
  padding: '4px 12px', 
  borderRadius: '6px', 
  fontSize: '12px', 
  fontWeight: 'bold'
};

// --- 4. KOMPONEN UTAMA APP ---
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fc' }}>
        <Navbar />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<div style={{paddingTop:'150px', textAlign:'center'}}><h1>Home Page</h1></div>} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;