import "../../style/Quiz.css";
import React from "react";

function Quiz() {
  return (
    <div className="quiz-grid">
      <div className="card-kuis">
        <h3>HTML Dasar</h3>
        <p>10 Soal • 15 menit</p>
        <button className="btn-mulai">Mulai Kuis</button>
      </div>

      <div className="card-kuis">
        <h3>CSS Dasar</h3>
        <p>10 Soal • 15 menit</p>
        <button className="btn-mulai">Mulai Kuis</button>
      </div>

      <div className="card-kuis">
        <h3>JavaScript Dasar</h3>
        <p>15 Soal • 25 menit</p>
        <button className="btn-mulai">Mulai Kuis</button>
      </div>
    </div>
  );
}

export default Quiz;
