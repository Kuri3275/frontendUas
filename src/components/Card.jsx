export default function Card({ title, description }) {
  return (
    <div className="card">
      <div className="card-image">Picture</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Lihat</button>
    </div>
  );
}
