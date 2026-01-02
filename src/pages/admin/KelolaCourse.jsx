import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import  courseService from "../../api/admin/course.service";
export default function KelolaCourse() {
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: null,
  });
  const [editingId, setEditingId] = useState(null);

  const tableRef = useRef(null);

  // AUTO-ANIMATE INIT
  useEffect(() => {
    if (tableRef.current) autoAnimate(tableRef.current);
  }, [tableRef]);

  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const res = await courseService.getCourses({ page });
      setCourses(res.data.data.data);
      setMeta(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const submitForm = async () => {
    if (!form.title || !form.category) {
      toast.error("Judul dan kategori wajib diisi");
      return;
    }

    const loadingToast = toast.loading(
      editingId ? "Menyimpan perubahan..." : "Membuat course..."
    );

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      if (editingId) {
        await courseService.update(editingId, formData);
        toast.success("Course berhasil diperbarui", { id: loadingToast });
      } else {
        await courseService.create(formData);
        toast.success("Course berhasil dibuat", { id: loadingToast });
      }

      resetForm();
      fetchCourses(currentPage);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Gagal menyimpan course",
        { id: loadingToast }
      );
    }
  };

  const resetForm = () => {
    setForm({ title: "", category: "", description: "", thumbnail: null });
    setEditingId(null);
    setShowForm(false);
  };

  const editCourse = (course) => {
    setForm({
      title: course.title,
      category: course.category,
      description: course.description,
      thumbnail: null,
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const deleteCourse = async (id) => {
    if (!confirm("Hapus course ini?")) return;

    const loadingToast = toast.loading("Menghapus course...");

    try {
      await courseService.delete(id);
      toast.success("Course berhasil dihapus", { id: loadingToast });
      fetchCourses(currentPage);
    } catch (err) {
      toast.error("Gagal menghapus course", { id: loadingToast });
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Kelola Course
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Tambah, ubah, dan kelola seluruh course e-learning Anda
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
          >
            <Plus
              size={18}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Tambah Course
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table ref={tableRef} className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Judul</th>
              <th className="px-6 py-4 text-left font-medium">Category</th>
              <th className="px-6 py-4 text-left font-medium">Deskripsi</th>
              <th className="px-6 py-4 text-left font-medium">Thumbnail</th>
              <th className="px-6 py-4 text-left font-medium">Dibuat oleh</th>
              <th className="px-6 py-4 text-center w-36 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  {loading ? "Memuat data..." : "Tidak ada data course."}
                </td>
              </tr>
            ) : null}
            {courses.map((course) => (
              <motion.tr
                key={course.id}
                className="hover:bg-gray-50"
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {course.title}
                </td>
                <td className="px-6 py-4 text-gray-600 leading-relaxed">
                  {course.category}
                </td>
                <td className="px-6 py-4 text-gray-600 leading-relaxed">
                  {course.description}
                </td>
                <td className="px-6 py-4">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt="Thumbnail"
                      className="h-16 w-16 object-cover rounded-md"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600 leading-relaxed">
                  {course.creator?.name || "-"}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => editCourse(course)}
                    className="rounded-lg p-2 text-sky-600 hover:bg-sky-100"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta?.last_page && (
        <div className="flex items-center justify-between pt-6">
          <span className="text-sm text-gray-600">
            Page {meta.current_page} of {meta.last_page}
          </span>
          <div className="flex gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              disabled={currentPage === meta.last_page}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-xl bg-white p-6 space-y-6 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {editingId ? "Edit Course" : "Tambah Course"}
                </h3>
                <button onClick={resetForm} className="rounded-md p-1 hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Judul course"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Kategori Course"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Deskripsi Course"
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, thumbnail: e.target.files[0] })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  onClick={resetForm}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={submitForm}
                  className="flex items-center border gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-black hover:bg-blue-700"
                >
                  <Save size={16} /> Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
