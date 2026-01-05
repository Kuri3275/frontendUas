import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Save, Search, BookOpen, Clock, Layers, HelpCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";

import quizService from "../../api/admin/quiz.service";
import courseService from "../../api/admin/course.service";
import quizCategoryService from "../../api/admin/quizCategory.service";
import QuizQuestionsModal from "./QuizQuestionsModal";

export default function KelolaQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    course_id: "",
    quiz_category_id: "",
    time_limit_minutes: "",
  });

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const tableRef = useRef(null);
  useEffect(() => { if (tableRef.current) autoAnimate(tableRef.current); }, []);

  /* ================= FETCH DATA LOGIC ================= */
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [quizRes, coursesRes, categoriesRes] = await Promise.all([
        quizService.getQuiz(),
        courseService.getSelect(),
        quizCategoryService.getQuizCategories(),
      ]);

      // Helper sakti untuk menembus lapisan data API
      const extractArray = (res) => {
        if (!res?.data) return [];
        if (res.data.data?.data) return res.data.data.data; // Lapisan Pagination
        if (Array.isArray(res.data.data)) return res.data.data; // Lapisan Standard
        if (Array.isArray(res.data)) return res.data; // Lapisan Direct
        return [];
      };

      const quizData = extractArray(quizRes);
      const coursesData = extractArray(coursesRes);
      const categoriesData = extractArray(categoriesRes);

      // Gabungkan data agar ID berubah menjadi Label Nama di tabel
      const mappedQuizzes = quizData.map((q) => ({
        ...q,
        course: coursesData.find((c) => String(c.id) === String(q.course_id)) || null,
        category: categoriesData.find((c) => String(c.id) === String(q.quiz_category_id)) || null,
      }));

      setQuizzes(mappedQuizzes);
      setCourses(coursesData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      toast.error("Koneksi ke server bermasalah");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  /* ================= ACTIONS ================= */
  const resetForm = () => {
    setForm({ title: "", description: "", course_id: "", quiz_category_id: "", time_limit_minutes: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const submitForm = async () => {
    if (!form.title.trim() || !form.course_id || !form.quiz_category_id) {
      return toast.error("Lengkapi data yang wajib diisi!");
    }

    setLoading(true);
    try {
      if (editingId) {
        await quizService.update(editingId, form);
        toast.success("Quiz diperbarui!");
      } else {
        await quizService.create(form);
        toast.success("Quiz ditambahkan!");
      }
      resetForm();
      fetchAllData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const editQuiz = (q) => {
    setForm({
      title: q.title,
      description: q.description || "",
      course_id: String(q.course_id),
      quiz_category_id: String(q.quiz_category_id),
      time_limit_minutes: q.time_limit_minutes || "",
    });
    setEditingId(q.id);
    setShowForm(true);
  };

  const deleteQuiz = async (id) => {
    if (!confirm("Hapus kuis ini secara permanen?")) return;
    try {
      await quizService.delete(id);
      toast.success("Berhasil dihapus");
      fetchAllData();
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  };

  /* ================= SEARCH & PAGINATION ================= */
  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE);
  const paginatedQuizzes = filteredQuizzes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans text-slate-900">
      
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-[2rem] bg-indigo-950 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Kelola <span className="text-indigo-400">Quiz</span></h1>
            <p className="text-indigo-100/60 mt-2 font-medium">Buat tantangan belajar yang interaktif untuk siswa Anda.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95">
            <Plus size={22} className="inline mr-2" strokeWidth={3} /> Tambah Quiz
          </button>
        </div>
      </div>

      {/* SEARCH & TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl flex items-center gap-2"><Layers className="text-indigo-600" size={20} /> Master Data Quiz</h3>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Cari quiz..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto px-4">
          <table ref={tableRef} className="w-full min-w-[900px]">
            <thead>
              <tr className="text-slate-400 text-[11px] font-black uppercase tracking-widest">
                <th className="px-6 py-6 text-left">Detail Quiz</th>
                <th className="px-6 py-6 text-left">Relasi</th>
                <th className="px-6 py-6 text-center">Soal</th>
                <th className="px-6 py-6 text-center">Durasi</th>
                <th className="px-6 py-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold">Sinkronisasi data...</td></tr>
              ) : paginatedQuizzes.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold">Data kosong.</td></tr>
              ) : (
                paginatedQuizzes.map((q) => (
                  <tr key={q.id} className="group hover:bg-indigo-50/40 transition-all">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800 text-[15px]">{q.title}</div>
                      <div className="text-slate-400 text-xs line-clamp-1">{q.description || "Tanpa deskripsi"}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded w-fit">{q.course?.title || "No Course"}</span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit">{q.category?.name || "No Category"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button onClick={() => { setActiveQuiz(q); setShowQuestionModal(true); }} className="px-4 py-2 border rounded-xl text-xs font-black hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                        <HelpCircle size={14} className="inline mr-1" /> KELOLA SOAL
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center font-bold text-sm text-slate-600">
                      <Clock size={14} className="inline mr-1 text-indigo-400" /> {q.time_limit_minutes ? `${q.time_limit_minutes}m` : "-"}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => editQuiz(q)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Pencil size={18} /></button>
                        <button onClick={() => deleteQuiz(q.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-[2.5rem] p-8 md:p-10 w-full max-w-lg shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900">{editingId ? "Edit Konfigurasi Quiz" : "Buat Quiz Baru"}</h3>
                <button onClick={resetForm} className="p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X size={20} /></button>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Judul Quiz</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none font-bold" placeholder="Judul..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Course</label>
                    <select value={form.course_id} onChange={(e) => setForm({...form, course_id: e.target.value})} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none font-bold text-sm appearance-none outline-none">
                      <option value="">Pilih...</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Kategori</label>
                    <select value={form.quiz_category_id} onChange={(e) => setForm({...form, quiz_category_id: e.target.value})} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none font-bold text-sm appearance-none outline-none">
                      <option value="">Pilih...</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Waktu (Menit)</label>
                  <input type="number" value={form.time_limit_minutes} onChange={(e) => setForm({...form, time_limit_minutes: e.target.value})} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none font-bold" placeholder="Contoh: 60" />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button onClick={resetForm} className="flex-1 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all">Batal</button>
                <button onClick={submitForm} disabled={loading} className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
                  Simpan Konfigurasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUESTION MODAL */}
      {showQuestionModal && activeQuiz && (
        <QuizQuestionsModal quiz={activeQuiz} onClose={() => { setShowQuestionModal(false); setActiveQuiz(null); fetchAllData(); }} />
      )}
    </div>
  );
}