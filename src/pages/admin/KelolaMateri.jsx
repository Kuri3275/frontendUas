import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

export default function KelolaMateri() {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course_id: "",
    title: "",
    content: "",
    order: "",
    image: null,
  });

  // pagination //
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const ITEMS_PER_PAGE = 5;

  /* ================= FETCH ================= */
  const fetchMaterials = async () => {
    try {
      const res = await api.get("/admin/materials");
      setMaterials(res.data.data);
    } catch {
      toast.error("Gagal memuat data materi");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/admin/courses/select");
      setCourses(res.data.data);
    } catch {
      toast.error("Gagal memuat course");
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchCourses();
  }, []);

  /* ================= FORM ================= */
  const resetForm = () => {
    setForm({
      course_id: "",
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
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null && v !== "") fd.append(k, v);
    });

    setLoading(true);
    try {
      if (editingId) {
        await api.post(`/admin/materials/${editingId}?_method=PUT`, fd);
        toast.success("Materi berhasil diperbarui");
      } else {
        await api.post("/admin/materials", fd);
        toast.success("Materi berhasil ditambahkan");
      }

      resetForm();
      fetchMaterials();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan materi");
    } finally {
      setLoading(false);
    }
  };

  const editMaterial = (m) => {
    setForm({
      course_id: m.course_id,
      title: m.title,
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
      await api.delete(`/admin/materials/${id}`);
      toast.success("Materi berhasil dihapus");
      fetchMaterials();
    } catch {
      toast.error("Gagal menghapus materi");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8">
      {/* ===== HEADER ===== */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-transparent pointer-events-none" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Kelola Materi
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Tambah, edit, dan kelola materi pembelajaran
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="
              group inline-flex items-center gap-2
              rounded-xl bg-blue-600 px-6 py-3
              text-sm font-semibold text-black
              shadow-md shadow-blue-600/20
              transition-all duration-300
              hover:bg-blue-700 hover:shadow-lg
              active:scale-95
            "
          >
            <Plus size={18} className="group-hover:rotate-90 transition" />
            Tambah Materi
          </button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Judul</th>
              <th className="px-6 py-4 text-left font-medium">Course</th>
              <th className="px-6 py-4 text-left font-medium">Konten</th>
              <th className="px-6 py-4 text-left font-medium">Image</th>
              <th className="px-6 py-4 text-center font-medium">Urutan</th>
              <th className="px-6 py-4 text-center w-32 font-medium">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {materials.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  Tidak ada materi
                </td>
              </tr>
            )}

            {materials.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {m.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {courses.find((c) => c.id === m.course_id)?.title || "-"}
                </td>
                <td className="px-6 py-4 text-gray-600 line-clamp-2">
                  {m.content || "-"}
                </td>
                <td className="px-6 py-4">
                  {m.image_url ? (
                    <img
                      src={m.image_url}
                      className="h-14 w-14 rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {m.order ?? "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => editMaterial(m)}
                    className="rounded-lg p-2 text-sky-600 hover:bg-sky-100 mr-2"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteMaterial(m.id)}
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

      {/* ===== MODAL ===== */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {editingId ? "Edit Materi" : "Tambah Materi"}
              </h3>
              <button
                onClick={resetForm}
                className="rounded-md p-1 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <select
                value={form.course_id}
                onChange={(e) =>
                  setForm({ ...form, course_id: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Pilih Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>

              <input
                placeholder="Judul materi"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
              />

              <textarea
                rows={3}
                placeholder="Konten materi"
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Urutan"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
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
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-black hover:bg-blue-700"
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
