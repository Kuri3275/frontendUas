import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { 
  Plus, Pencil, Trash2, X, Save, Image as ImageIcon, 
  ChevronLeft, ChevronRight, Search, BookOpen, Loader2 
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import courseService from "../../api/admin/course.service";
import courseCategoryService from "../../api/admin/courseCategory.service";

// Pastikan port sesuai dengan backend Laravel Sensei
const STORAGE_URL = "http://localhost:8000/storage";

export default function KelolaCourse() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({ 
    title: "", 
    course_category_id: "", 
    description: "", 
    thumbnail: null 
  });

  const tableRef = useRef(null);

  useEffect(() => { 
    if (tableRef.current) autoAnimate(tableRef.current); 
  }, [tableRef]);

  // Fetch data courses
  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const res = await courseService.getCourses({ page });
      // Sesuaikan dengan struktur response Laravel Sensei
      setCourses(res.data.data.data || []);
      setMeta(res.data.data);
    } catch (err) {
      toast.error("Gagal sinkronisasi data dari server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories untuk dropdown
  const fetchCategories = async () => {
    try {
      const res = await courseCategoryService.getCategories();
      setCategories(res.data.data || res.data);
    } catch (err) { 
      console.error("Gagal load kategori:", err); 
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
    fetchCategories();
  }, [currentPage]);

  // Reset form & states
  const resetForm = () => {
    setForm({ title: "", course_category_id: "", description: "", thumbnail: null });
    setPreviewUrl(null);
    setEditingId(null);
    setShowForm(false);
  };

  // Handle pilih file & preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Ukuran file terlalu besar (Maks 2MB)");
      }
      setForm({ ...form, thumbnail: file });
      setPreviewUrl(URL.createObjectURL(file));
      toast.success("Gambar terpilih!");
    }
  };

  // Edit handler
  const editCourse = (course) => {
    setForm({
      title: course.title || "",
      course_category_id: course.course_category_id || "",
      description: course.description || "",
      thumbnail: null, // Reset file input saat edit
    });
    // Jika ada thumbnail lama, tampilkan di preview
    setPreviewUrl(course.thumbnail ? `${STORAGE_URL}/${course.thumbnail.replace('public/', '')}` : null);
    setEditingId(course.id);
    setShowForm(true);
  };

  // Delete handler
  const deleteCourse = async (id) => {
    if (!window.confirm("Apakah Sensei yakin ingin menghapus data ini?")) return;
    try {
      await courseService.delete(id);
      toast.success("Data telah terhapus");
      fetchCourses(currentPage);
    } catch (err) {
      toast.error("Gagal menghapus data");
    }
  };

  // Submit handler (Create & Update)
  const submitForm = async () => {
    if (!form.title) return toast.error("Judul tidak boleh kosong!");
    
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sedang memproses data...");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description || "");
      if (form.course_category_id) formData.append("course_category_id", form.course_category_id);
      
      // Hanya kirim thumbnail jika ada file baru yang dipilih
      if (form.thumbnail instanceof File) {
        formData.append("thumbnail", form.thumbnail);
      }

      if (editingId) {
        // Method Spoofing untuk Laravel agar bisa baca FormData di PUT
        formData.append("_method", "PUT");
        await courseService.update(editingId, formData);
        toast.success("Data berhasil diperbarui!", { id: loadingToast });
      } else {
        await courseService.create(formData);
        toast.success("Data berhasil ditambahkan!", { id: loadingToast });
      }

      resetForm();
      fetchCourses(currentPage);
    } catch (err) {
      toast.error("Terjadi kendala teknis", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans tracking-tight text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              Admin Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">Course <span className="text-blue-500">Mastery</span></h1>
            <p className="text-slate-400 text-lg max-w-md font-medium">Kelola kurikulum edukasi masa depan dengan presisi tinggi.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-3 active:scale-95 hover:-translate-y-1"
          >
            <Plus size={22} strokeWidth={3} /> Tambah Course
          </button>
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} /> Daftar Katalog
          </h3>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Cari course..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table ref={tableRef} className="w-full min-w-[800px]">
            <thead>
              <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em]">
                <th className="px-6 py-6 text-left">Detail Course</th>
                <th className="px-6 py-6 text-left">Category</th>
                <th className="px-6 py-6 text-left">Media</th>
                <th className="px-6 py-6 text-left">Creator</th>
                <th className="px-6 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600 mb-2" size={32} />
                    <p className="text-slate-400 font-bold">Menyinkronkan data...</p>
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <motion.tr key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800 text-[15px] group-hover:text-blue-600 transition-colors">{course.title}</div>
                      <div className="text-slate-400 text-xs mt-1 font-medium line-clamp-1 italic">{course.description || "Tanpa deskripsi"}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                        {course.category?.name || "Global"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-20 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative group/img shadow-inner">
                        {course.thumbnail ? (
                          <img 
                            src={`${STORAGE_URL}/${course.thumbnail.replace('public/', '')}`} 
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/200x120?text=Error";
                            }}
                          />
                        ) : (
                          <ImageIcon size={16} className="absolute inset-0 m-auto text-slate-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                          {course.creator?.name?.substring(0,2).toUpperCase() || "AD"}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{course.creator?.name || "Admin"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => editCourse(course)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => deleteCourse(course.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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

        {/* --- MODERN PAGINATION --- */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-bold text-slate-500">
            Menampilkan <span className="text-slate-900">{courses.length}</span> dari <span className="text-slate-900">{meta.total || 0}</span> data
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
              {[...Array(meta.last_page || 0)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              )).slice(Math.max(0, currentPage - 2), Math.min(meta.last_page, currentPage + 1))}
            </div>
            <button
              disabled={currentPage === meta.last_page}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL FORM --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 my-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{editingId ? "Update Data" : "Entri Baru"}</h3>
                  <p className="text-slate-400 text-sm font-medium">Lengkapi parameter course di bawah.</p>
                </div>
                <button onClick={resetForm} className="p-3 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Judul Materi</label>
                  <input
                    type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white focus:ring-4 focus:ring-blue-600/5 rounded-2xl transition-all outline-none font-bold text-slate-800"
                    placeholder="Masukkan judul yang menarik..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Kategori</label>
                    <select
                      value={form.course_category_id} onChange={(e) => setForm({ ...form, course_category_id: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold text-slate-800 appearance-none cursor-pointer"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Cover Image</label>
                    <label className="flex items-center gap-3 px-5 py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-blue-400 transition-all group relative overflow-hidden">
                      {previewUrl && (
                        <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Preview Background" />
                      )}
                      <ImageIcon className="text-slate-400 group-hover:text-blue-500 z-10" size={20} />
                      <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600 truncate z-10">
                        {form.thumbnail ? "File Terpilih" : "Upload File"}
                      </span>
                      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Deskripsi</label>
                  <textarea
                    rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold text-slate-800 resize-none"
                    placeholder="Tuliskan gambaran umum materi..."
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button disabled={isSubmitting} onClick={resetForm} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Batal</button>
                <button
                  disabled={isSubmitting}
                  onClick={submitForm}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
                  {editingId ? "Perbarui Data" : "Simpan Permanen"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}