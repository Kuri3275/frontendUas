import "../../style/layout.css";

export default function Tryout() {
  return (
    <div className="page-container">
      <div className="quiz-box">
        <h2>Quiz HTML Dasar</h2>

        <p className="question">
          1. Apa kepanjangan dari HTML?
        </p>

        <div className="options">
          <label>
            <input type="radio" name="q1" /> Hyper Text Markup Language
          </label>
          <label>
            <input type="radio" name="q1" /> High Text Machine Language
          </label>
          <label>
            <input type="radio" name="q1" /> Hyperlink Text Language
          </label>
          <label>
            <input type="radio" name="q1" /> Home Tool Markup Language
          </label>
        </div>

        <div className="quiz-action">
          <button className="secondary">Sebelumnya</button>
          <button className="primary">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
}
