import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

export default function KelolaKategori() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/quiz-categories");
      setCategories(res.data.data); // pastikan response sesuai backend
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory) return;
    setLoading(true);
    try {
      await api.post("/admin/quiz-categories", { name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/quiz-categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Kelola Quiz Category
      </h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Nama Kategori"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-semibold text-blue-300 ${
            loading
              ? "bg-white-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-indigo-700"
          } transition`}
        >
          {loading ? "Menambahkan..." : "Tambah Kategori"}
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <span className="text-blue-700">{cat.name}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
