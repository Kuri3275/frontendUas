import "../style/layout.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-container">
      <form className="auth-card">
        <h2>Login E-Learning</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="primary full">Masuk</button>

        <p className="auth-link">
          Belum punya akun? <Link to="/register">Buat Akun Baru</Link>
        </p>
      </form>
    </div>
  );
}
