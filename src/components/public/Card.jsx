import "../../style/layout.css";

export default function Card({ title, desc }) {
  return (
    <div className="card">
      <div className="card-img">Picture</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>Lihat</button>
    </div>
  );
}
