import { useEffect, useState } from "react";
import api from "../../api/axios";

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
    <div className="admin-page">
      <h2>Kelola Quiz Category</h2>

      <input
        type="text"
        placeholder="Nama Kategori"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAdd} disabled={loading}>
        {loading ? "Menambahkan..." : "Tambah Kategori"}
      </button>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}{" "}
            <button onClick={() => handleDelete(cat.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
