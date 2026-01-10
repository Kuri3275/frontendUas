import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import { User, Mail, Lock, Key, UserPlus, ArrowRight } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", kode_admin: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/register", form);
      alert("Registration_Successful");
      navigate("/login");
    } catch (err) {
      alert("REGISTRATION_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6 transition-colors duration-500">
      <div className="w-full max-w-md relative">
        <div className="bg-white dark:bg-white/[0.02] backdrop-blur-2xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-500/20">
              <UserPlus size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Register</h2>
            <p className="text-[10px] font-mono text-slate-500 mt-2 tracking-[0.2em] uppercase">Initialize_User_Profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                name="name"
                placeholder="FULL_NAME"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white font-mono text-sm transition-all"
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="EMAIL_ADDRESS"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white font-mono text-sm transition-all"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="CREATE_PASSWORD"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white font-mono text-sm transition-all"
              />
            </div>

            <div className="relative group">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                name="kode_admin"
                placeholder="ADMIN_BYPASS_CODE (OPTIONAL)"
                value={form.kode_admin}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white font-mono text-[10px] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400 text-white py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              {loading ? "INITIALIZING..." : <>CREATE_ACCOUNT <ArrowRight size={16} /></>}
            </button>

            <p className="text-[10px] text-center text-slate-500 font-mono mt-8 uppercase tracking-widest">
              Already_Registered?{" "}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                Identify_Self
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}