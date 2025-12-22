import "../../style/layout.css";
import { Link } from "react-router-dom";

export default function Quiz() {
  return (
    <div className="page-container">
      <h2>Daftar Quiz</h2>

      <div className="quiz-grid">
        <div className="quiz-card">
          <h3>HTML Dasar</h3>
          <p>10 soal · 15 menit</p>
          <Link to="/tryout">
            <button className="primary">Mulai</button>
          </Link>
        </div>

        <div className="quiz-card">
          <h3>CSS Dasar</h3>
          <p>10 soal · 15 menit</p>
          <button className="primary">Mulai</button>
        </div>

        <div className="quiz-card">
          <h3>JavaScript Dasar</h3>
          <p>15 soal · 25 menit</p>
          <button className="primary">Mulai</button>
        </div>
      </div>
    </div>
  );
}
