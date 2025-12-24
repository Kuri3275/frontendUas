import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import api from "../../api/axios";

export default function KelolaCourse() {
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/courses?page=${page}`);
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
    try {
      if (editingId) {
        await api.put(`/admin/courses/${editingId}`, form);
      } else {
        await api.post("/admin/courses", form);
      }
      resetForm();
      fetchCourses();
    } catch {
      alert("Gagal menyimpan data");
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const editCourse = (course) => {
    setForm({
      title: course.title,
      description: course.description,
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const deleteCourse = async (id) => {
    if (!confirm("Hapus course ini?")) return;
    await api.delete(`/admin/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">
          Kelola Course
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-black hover:bg-blue-700"
        >
          <Plus size={18} />
          Tambah Course
        </button>
      </div>


      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  <table className="w-full text-sm">
    <thead className="bg-gray-50 text-gray-600">
      <tr>
        <th className="px-6 py-4 text-left font-medium">Judul</th>
        <th className="px-6 py-4 text-left font-medium">Deskripsi</th>
        <th className="px-6 py-4 text-center w-36 font-medium">Aksi</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-100">
      {courses.length === 0 ? (
    <tr>
      <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
        {loading ? "Memuat data..." : "Tidak ada data course."}
      </td>
    </tr>
  ) : (null)} 
      {courses.map(course => (
        <tr key={course.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 font-medium text-gray-800">
            {course.title}
          </td>
          <td className="px-6 py-4 text-gray-600 leading-relaxed">
            {course.description}
          </td>
          <td className="px-6 py-4">
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
        </tr>
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
                onClick={() => setCurrentPage(p => p - 1)}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                Prev
              </button>

              <button
                disabled={currentPage === meta.last_page}
                onClick={() => setCurrentPage(p => p + 1)}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {editingId ? "Edit Course" : "Tambah Course"}
              </h3>
              <button onClick={resetForm}className="rounded-md p-1 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Judul Course"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
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
                <Save size={16} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

