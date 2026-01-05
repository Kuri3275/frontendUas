import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Save, Search, Layout, Tag, ChevronLeft, ChevronRight, Loader2, Hash } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import quizCategoryService from "../../api/admin/quizCategory.service";

export default function KelolaKategoriQuiz() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const tableRef = useRef(null);
  useEffect(() => { if (tableRef.current) autoAnimate(tableRef.current); }, []);

  /* ================= HELPERS ================= */
  const generateSlug = (text) => 
    text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await quizCategoryService.getQuizCategories();
      setCategories(res.data.data || res.data);
    } catch {
      toast.error("Gagal mengambil data kategori");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= HANDLER ================= */
  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Nama kategori wajib diisi");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading(editingId ? "Memperbarui..." : "Menambahkan...");
    try {
      if (editingId) {
        await quizCategoryService.update(editingId, form);
        toast.success("Kategori berhasil diperbarui", { id: loadingToast });
      } else {
        await quizCategoryService.create(form);
        toast.success("Kategori berhasil ditambahkan", { id: loadingToast });
      }
      resetForm();
      fetchCategories();
    } catch {
      toast.error("Gagal menyimpan kategori", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    const loadingToast = toast.loading("Menghapus...");
    try {
      await quizCategoryService.delete(id);
      toast.success("Kategori berhasil dihapus", { id: loadingToast });
      fetchCategories();
    } catch {
      toast.error("Gagal menghapus kategori", { id: loadingToast });
    }
  };

  const editCategory = (cat) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  /* ================= PAGINATION & SEARCH ================= */
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans tracking-tight text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-rose-950 p-8 md:p-12 shadow-2xl shadow-rose-900/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest">
              Evaluation Center
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">Quiz <span className="text-rose-500">Categories</span></h1>
            <p className="text-rose-100/60 text-lg max-w-md font-medium">Manajemen klasifikasi kuis untuk mempermudah navigasi ujian.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-600/30 flex items-center gap-3 active:scale-95 hover:-translate-y-1"
          >
            <Plus size={22} strokeWidth={3} /> Tambah Kategori
          </button>
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <Layout className="text-rose-600" size={20} /> List Kategori Quiz
          </h3>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari kategori..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rose-500/20 transition-all font-medium outline-none" 
            />
          </div>
        </div>

        <div className="overflow-x-auto px-4">
          <table ref={tableRef} className="w-full min-w-[800px]">
            <thead>
              <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em]">
                <th className="px-6 py-6 text-left">Nama Kategori</th>
                <th className="px-6 py-6 text-left">Slug</th>
                <th className="px-6 py-6 text-left">Deskripsi</th>
                <th className="px-6 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold">Tidak ada data ditemukan.</td>
                </tr>
              ) : (
                paginatedCategories.map((cat) => (
                  <motion.tr key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-rose-50/50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                          {cat.name.substring(0, 1)}
                        </div>
                        <div className="font-bold text-slate-800 text-[15px] group-hover:text-rose-700 transition-colors">{cat.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold font-mono">
                        #{cat.slug}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-slate-500 text-sm font-medium line-clamp-1 max-w-xs">{cat.description || "—"}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => editCategory(cat)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Halaman {currentPage} dari {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL FORM --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 my-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingId ? "Edit Kategori" : "Kategori Baru"}</h3>
                  <p className="text-slate-400 text-sm font-medium italic">Data kategori kuis ujian.</p>
                </div>
                <button onClick={resetForm} className="p-3 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nama Kategori</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      type="text" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-600/20 focus:bg-white focus:ring-4 focus:ring-rose-600/5 rounded-2xl transition-all outline-none font-bold text-slate-800"
                      placeholder="e.g. Ujian Harian"
                    />
                  </div>
                </div>

                {/* --- SLUG FIELD (AUTO GENERATED) --- */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Slug Identity (Auto)</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                    <input
                      type="text" 
                      value={generateSlug(form.name)} 
                      readOnly
                      className="w-full pl-12 pr-5 py-4 bg-slate-100 border-none rounded-2xl outline-none font-mono text-xs font-bold text-rose-600 cursor-not-allowed"
                      placeholder="Slug-akan-muncul-otomatis..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Deskripsi</label>
                  <textarea
                    rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-600 rounded-2xl outline-none font-bold text-slate-800 resize-none transition-all"
                    placeholder="Keterangan kategori..."
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button onClick={resetForm} className="flex-1 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all">Batal</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-[2] py-4 bg-rose-600 text-white rounded-2xl font-bold shadow-xl shadow-rose-600/30 hover:bg-rose-700 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />} 
                  {editingId ? "Perbarui" : "Simpan Kategori"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}