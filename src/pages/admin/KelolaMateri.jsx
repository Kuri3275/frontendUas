import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Save, Search, BookOpen, Layers, Hash, Image as ImageIcon, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import toast from "react-hot-toast";
import materialService from "../../api/admin/materi.service";
import courseService from "../../api/admin/course.service";
import materialCategoryService from "../../api/admin/materiCategory.service";

export default function KelolaMateri() {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    course_id: "",
    material_category_id: "",
    title: "",
    content: "",
    order: "",
    image: null,
  });

  const tableRef = useRef(null);
  useEffect(() => { if (tableRef.current) autoAnimate(tableRef.current); }, []);

  /* ================= FETCH ================= */
  const fetchMaterials = async () => {
    try {
      const res = await materialService.getMateri();
      setMaterials(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat data materi");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await courseService.getSelect();
      setCourses(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat course");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await materialCategoryService.getAll();
      setCategories(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat kategori materi");
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchCourses();
    fetchCategories();
  }, []);

  /* ================= FORM LOGIC (UNTOUCHED) ================= */
  const resetForm = () => {
    setForm({
      course_id: "",
      material_category_id: "",
      title: "",
      content: "",
      order: "",
      image: null,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const submitForm = async () => {
    if (!form.course_id || !form.title.trim()) {
      toast.error("Course dan Judul wajib diisi");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") fd.append(key, value);
    });

    setLoading(true);
    const loadingToast = toast.loading(editingId ? "Memperbarui..." : "Menambahkan...");
    try {
      if (editingId) {
        await materialService.update(editingId, fd);
        toast.success("Materi diperbarui", { id: loadingToast });
      } else {
        await materialService.create(fd);
        toast.success("Materi ditambahkan", { id: loadingToast });
      }
      resetForm();
      fetchMaterials();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const editMaterial = (m) => {
    setForm({
      course_id: m.course_id || "",
      material_category_id: m.material_category_id || "",
      title: m.title || "",
      content: m.content || "",
      order: m.order || "",
      image: null,
    });
    setEditingId(m.id);
    setShowForm(true);
  };

  const deleteMaterial = async (id) => {
    if (!confirm("Hapus materi ini?")) return;
    try {
      await materialService.delete(id);
      toast.success("Materi dihapus");
      fetchMaterials();
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans tracking-tight text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-12 shadow-2xl shadow-slate-900/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest">
              Content Management
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">Manage <span className="text-sky-500">Materials</span></h1>
            <p className="text-slate-400 text-lg max-w-md font-medium">Susun kurikulum dan materi pembelajaran untuk setiap course.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-sky-600/30 flex items-center gap-3 active:scale-95 hover:-translate-y-1"
          >
            <Plus size={22} strokeWidth={3} /> Tambah Materi
          </button>
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <BookOpen className="text-sky-600" size={20} /> List Materi
          </h3>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari judul materi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 transition-all font-medium outline-none" 
            />
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table ref={tableRef} className="w-full min-w-[1000px]">
            <thead>
              <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em]">
                <th className="px-6 py-6 text-left">Materi & Thumbnail</th>
                <th className="px-6 py-6 text-left">Course & Category</th>
                <th className="px-6 py-6 text-left">Content Preview</th>
                <th className="px-6 py-6 text-center">Order</th>
                <th className="px-6 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {materials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold">Belum ada materi tersedia.</td>
                </tr>
              ) : (
                filteredMaterials.map((m) => (
                  <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-sky-50/50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-100 flex-shrink-0">
                          {m.image_url ? (
                            <img src={m.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={20} /></div>
                          )}
                        </div>
                        <div className="font-bold text-slate-800 text-[15px] group-hover:text-sky-700 transition-colors line-clamp-1">{m.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                           {courses.find((c) => c.id === m.course_id)?.title || "Unknown Course"}
                        </div>
                        <div className="inline-flex px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                          {categories.find((c) => c.id === m.material_category_id)?.name || "Uncategorized"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-slate-500 text-sm font-medium line-clamp-1 max-w-[200px]">{m.content || "—"}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="font-mono font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg text-xs">#{m.order || '0'}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => editMaterial(m)} className="p-2.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all">
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => deleteMaterial(m.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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

      {/* --- MODAL FORM --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 my-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{editingId ? "Update Materi" : "Materi Baru"}</h3>
                  <p className="text-slate-400 text-sm font-medium italic">Isi detail konten pembelajaran.</p>
                </div>
                <button onClick={resetForm} className="p-3 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Pilih Course</label>
                  <select
                    value={form.course_id}
                    onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-600/20 rounded-2xl transition-all outline-none font-bold text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="">-- Pilih Course --</option>
                    {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Pilih Kategori</label>
                  <select
                    value={form.material_category_id}
                    onChange={(e) => setForm({ ...form, material_category_id: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-600/20 rounded-2xl transition-all outline-none font-bold text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Judul Materi</label>
                  <input
                    type="text" 
                    value={form.title} 
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-600/20 rounded-2xl transition-all outline-none font-bold text-slate-800"
                    placeholder="Contoh: Pengenalan Dasar React"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Konten Materi</label>
                  <textarea
                    rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-600 rounded-2xl outline-none font-bold text-slate-800 resize-none transition-all"
                    placeholder="Tuliskan isi materi atau deskripsi singkat..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Urutan (Order)</label>
                  <input
                    type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-600 rounded-2xl outline-none font-bold text-slate-800"
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Thumbnail Materi</label>
                  <input
                    type="file" 
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-sky-50 file:text-sky-600 hover:file:bg-sky-100 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4 border-t pt-8">
                <button onClick={resetForm} className="flex-1 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all">Batal</button>
                <button
                  onClick={submitForm}
                  disabled={loading}
                  className="flex-[2] py-4 bg-sky-600 text-white rounded-2xl font-bold shadow-xl shadow-sky-600/30 hover:bg-sky-700 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />} 
                  {editingId ? "Perbarui" : "Simpan Materi"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}