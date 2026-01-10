import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "AUTHENTICATION_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6 transition-colors duration-500">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-white/[0.02] backdrop-blur-2xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-6 border border-cyan-500/20">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">System_Login</h2>
            <p className="text-[10px] font-mono text-slate-500 mt-2 tracking-[0.2em] uppercase">Enter_Identity_Credentials</p>
          </div>

          {error && (
            <div className="mb-6 text-[10px] font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="EMAIL_ADDRESS"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:text-white font-mono text-sm transition-all"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="ACCESS_KEY"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-4 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:text-white font-mono text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-3 bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-[#020617] py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-xl shadow-cyan-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>EXECUTE_ACCESS <ArrowRight size={16} /></>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-500 font-mono mt-8 uppercase tracking-widest">
              No_Account?{" "}
              <Link to="/register" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                Create_New_Identity
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}