import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Save, Search, Hash, LayoutGrid, Tag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import courseCategoryService from "../../api/admin/courseCategory.service";

/* =========================
   SLUG GENERATOR
========================= */
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function KelolaKategoriCourse() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) autoAnimate(tableRef.current);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await courseCategoryService.getCategories();
      // Pastikan menyesuaikan dengan struktur response API kamu
      setCategories(res.data.data || res.data);
    } catch (err) {
      toast.error("Gagal sinkronisasi kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm({ name: "", slug: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const submitForm = async () => {
    if (!form.name || !form.slug) {
      toast.error("Nama dan Slug wajib diisi");
      return;
    }

    const loadingToast = toast.loading(editingId ? "Memperbarui data..." : "Menambahkan data...");

    try {
      if (editingId) {
        await courseCategoryService.update(editingId, form);
        toast.success("Kategori berhasil diperbarui", { id: loadingToast });
      } else {
        await courseCategoryService.create(form);
        toast.success("Kategori baru telah ditambahkan", { id: loadingToast });
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan data", { id: loadingToast });
    }
  };

  const editCategory = (cat) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || "" });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const deleteCategory = async (id) => {
    if (!confirm("Hapus kategori ini? Semua course terkait mungkin terpengaruh.")) return;

    const loadingToast = toast.loading("Menghapus...");
    try {
      await courseCategoryService.delete(id);
      toast.success("Kategori telah dihapus", { id: loadingToast });
      fetchCategories();
    } catch {
      toast.error("Gagal menghapus kategori", { id: loadingToast });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans tracking-tight text-slate-900">
      
      {/* --- HERO SECTION (EMERALD THEME) --- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-emerald-950 p-8 md:p-12 shadow-2xl shadow-emerald-900/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              Data Management
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">Course <span className="text-emerald-500">Categories</span></h1>
            <p className="text-emerald-100/60 text-lg max-w-md font-medium">Klasifikasikan materi belajar Anda agar lebih terstruktur dan mudah ditemukan.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-3 active:scale-95 hover:-translate-y-1"
          >
            <Plus size={22} strokeWidth={3} /> Tambah Kategori
          </button>
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <LayoutGrid className="text-emerald-600" size={20} /> List Kategori
          </h3>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari kategori..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium" 
            />
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table ref={tableRef} className="w-full min-w-[800px]">
            <thead>
              <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em]">
                <th className="px-6 py-6 text-left">Nama Kategori</th>
                <th className="px-6 py-6 text-left">Slug / URL</th>
                <th className="px-6 py-6 text-left">Deskripsi</th>
                <th className="px-6 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 animate-pulse font-bold">Menghubungkan ke server...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold">Belum ada kategori yang dibuat.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <motion.tr key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-emerald-50/50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                          {cat.name.substring(0, 1)}
                        </div>
                        <div className="font-bold text-slate-800 text-[15px] group-hover:text-emerald-700 transition-colors">{cat.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold font-mono">
                        <Hash size={12} /> {cat.slug}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-slate-500 text-sm font-medium line-clamp-1 max-w-xs">{cat.description || "—"}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => editCategory(cat)} className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => deleteCategory(cat.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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
      </div>

      {/* --- MODAL FORM (GLASSMORPHISM) --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/40 backdrop-blur-md font-sans">
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 my-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{editingId ? "Update Kategori" : "Kategori Baru"}</h3>
                  <p className="text-slate-400 text-sm font-medium italic">Master data klasifikasi course.</p>
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
                      onChange={(e) => {
                        const name = e.target.value;
                        setForm({ ...form, name, slug: generateSlug(name) });
                      }}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-600/20 focus:bg-white focus:ring-4 focus:ring-emerald-600/5 rounded-2xl transition-all outline-none font-bold text-slate-800"
                      placeholder="e.g. Web Development"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">URL Slug (Auto)</label>
                  <input
                    type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-100 border-none rounded-2xl outline-none font-mono text-xs font-bold text-emerald-700"
                    placeholder="web-development"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Deskripsi Tambahan</label>
                  <textarea
                    rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none font-bold text-slate-800 resize-none transition-all"
                    placeholder="Penjelasan singkat kategori..."
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button onClick={resetForm} className="flex-1 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all">Batal</button>
                <button
                  onClick={submitForm}
                  className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} /> {editingId ? "Perbarui" : "Simpan"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}