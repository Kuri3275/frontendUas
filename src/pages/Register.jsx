import "../style/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    admin_code: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Register berhasil");
      navigate("/login");

    } catch (err) {
      console.error(err.response?.data);
      alert("Register gagal");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Buat Akun Baru</h2>

        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="admin_code"
          placeholder="Kode Admin (opsional)"
          value={form.admin_code}
          onChange={handleChange}
        />

        <button type="submit" className="primary full">
          Daftar
        </button>

        <p className="auth-link">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
