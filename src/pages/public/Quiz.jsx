<<<<<<< HEAD:src/pages/public/Quiz.jsx
import "../../style/layout.css";
import { Link } from "react-router-dom";
=======
import React from 'react';
import './Quiz.css'; 
>>>>>>> d1776b03a479b92dde7dab9aedc61fe52f6a83e5:src/pages/Quiz.jsx

const QuizPage = () => {
  return (
    <div className="container-quiz">
      <div className="header-section">
        <nav style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        <span>Home</span> / <span style={{ color: '#5D5FEF', fontWeight: 'bold' }}>Tryout</span>
</nav>

         <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>QUIZZES</h1>
         <p style={{ color: '#666' }}>Pantau progres belajarmu di sini</p>
         
        <h1>QUIEZZS</h1>
        <p>Pantau progres belajarmu di sini</p>
      </div>

      <h2 className="title-pilih">Pilih Kuis Kamu</h2>

      {/* Pembungkus utama agar kartu berjejer ke samping */}
      <div className="quiz-grid">
        
        {/* Kartu HTML */}
        <div className="card-kuis border-html">
          <h3>HTML Dasar</h3>
          <p>10 Soal . 15 menit</p>
          <button className="btn-mulai">Mulai Kuis</button>
        </div>

        {/* Kartu CSS */}
        <div className="card-kuis border-css">
          <h3>CSS Dasar</h3>
          <p>10 Soal . 15 menit</p>
          <button className="btn-mulai">Mulai Kuis</button>
        </div>

        {/* Kartu JavaScript */}
        <div className="card-kuis border-js">
          <h3>JavaScript Dasar</h3>
          <p>15 Soal . 25 menit</p>
          <button className="btn-mulai">Mulai Kuis</button>
        </div>

      </div>
    </div>
  );
};

export default QuizPage;