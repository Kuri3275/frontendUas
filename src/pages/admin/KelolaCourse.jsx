import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../style/admin.css";


export default function KelolaCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
  try {
    const res = await api.get("/admin/courses");
    console.log("API RESPONSE:", res.data);
    setCourses(res.data.data); // ← INI PENTING
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchCourses();
  }, []);

  const submitForm = async () => {
    try {
      if (editingId) {
        await api.put(`/admin/courses/${editingId}`, form);
      } else {
        await api.post("/admin/courses", form);
      }
      resetForm();
      fetchCourses();
    } catch (err) {
      alert("Gagal menyimpan data");
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const editCourse = (course) => {
    setForm(course);
    setEditingId(course.id);
    setShowForm(true);
  };

  const deleteCourse = async (id) => {
    if (!confirm("Hapus course ini?")) return;
    await api.delete(`/admin/courses/${id}`);
    fetchCourses();
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Kelola Course</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Tambah Course
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th width="160">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(courses) && courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => editCourse(course)}>Edit</button>
                  <button onClick={() => deleteCourse(course.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? "Edit Course" : "Tambah Course"}</h3>

            <input
              placeholder="Judul"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Deskripsi"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={submitForm}>Simpan</button>
              <button onClick={resetForm}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
