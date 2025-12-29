import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import quizCategoryService from "../../api/quizCategory.service";

export default function KelolaKategoriQuiz() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await quizCategoryService.getAll();
      setCategories(res.data.data);
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
    try {
      if (editingId) {
        await quizCategoryService.update(editingId, form);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await quizCategoryService.create(form);
        toast.success("Kategori berhasil ditambahkan");
      }
      setForm({ name: "", description: "" });
      setEditingId(null);
      setShowForm(false);
      fetchCategories();
    } catch {
      toast.error("Gagal menyimpan kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    try {
      await quizCategoryService.delete(id);
      toast.success("Kategori berhasil dihapus");
      fetchCategories();
    } catch {
      toast.error("Gagal menghapus kategori");
    }
  };

  const editCategory = (cat) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditingId(cat.id);
    setShowForm(true);
  };

/* ================= PAGINATION & SEARCH ================= */
const filteredCategories = categories.filter((cat) =>
  cat.name.toLowerCase().includes(search.toLowerCase())
);

// reset halaman ke 1 saat search berubah
useEffect(() => {
  setCurrentPage(1);
}, [search]);

const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
const paginatedCategories = filteredCategories.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Kelola Kategori Quiz
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Tambah, hapus, dan kelola kategori quiz e-learning
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
          >
            <Plus size={18} className="transition-transform duration-300 group-hover:rotate-90" />
            {editingId ? "Edit Kategori" : "Tambah Kategori"}
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari kategori..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Nama Kategori</th>
              <th className="px-6 py-4 text-left font-medium">Slug</th>
              <th className="px-6 py-4 text-left font-medium">Deskripsi</th>
              <th className="px-6 py-4 text-center w-32 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedCategories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  Tidak ada kategori quiz
                </td>
              </tr>
            )}
            {paginatedCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
                <td className="px-6 py-4 text-gray-600">{cat.slug}</td>
                <td className="px-6 py-4 text-gray-600">{cat.description || "-"}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => editCategory(cat)}
                      className="p-2 rounded-md text-blue-600 hover:bg-blue-100"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 rounded-md text-red-600 hover:bg-red-100"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
                {editingId ? "Edit Kategori Quiz" : "Tambah Kategori Quiz"}
              </h3>
              <button onClick={() => { setShowForm(false); setEditingId(null); }}>
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nama kategori"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                placeholder="Deskripsi (opsional)"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100">Batal</button>
              <button onClick={handleSubmit} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-black hover:bg-blue-700">
                <Save size={16} /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
