import "../../style/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", form);

      // === AMBIL DATA SESUAI RESPONSE BACKEND ===
      const token = res.data.data.token;
      const user  = res.data.data.user;
       // === SIMPAN KE LOCAL STORAGE ===
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      alert("Login berhasil");
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      if (err.response) {
        // error dari backend (401, 422, dll)
        setError(err.response.data.message || "Login gagal");
      } else {
        // error koneksi
        setError("Tidak bisa terhubung ke server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login E-Learning</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="primary full" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </button>

        <p className="auth-link">
          Belum punya akun? <Link to="/register">Buat Akun Baru</Link>
        </p>
      </form>
    </div>
  );
}
