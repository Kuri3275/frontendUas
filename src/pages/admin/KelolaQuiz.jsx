import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import QuizQuestionsModal from "./QuizQuestionsModal";

export default function KelolaQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    course_id: "",
    quiz_category_id: "",
    time_limit_minutes: "",
  });

  
  /* ================= FETCH DATA ================= */
  
  const fetchQuiz = async () => {
    const res = await api.get("/admin/quiz");
    setQuizzes(res.data.data.data);
  };

  const fetchCourses = async () => {
    const res = await api.get("/admin/courses");
    setCourses(res.data.data.data);
  };
  
  const fetchCategories = async () => {
    const res = await api.get("/admin/quiz-categories");
    setCategories(res.data.data);
  };
  
  useEffect(() => {
    fetchQuiz();
    fetchCourses();
    fetchCategories();
  }, []);
  
  /* ================= SUBMIT ================= */
  
  const submitForm = async () => {
    console.log("SUBMIT FORM:", form);

    if (!form.title || !form.course_id || !form.quiz_category_id) {
      alert("Judul, Course, dan Kategori WAJIB diisi");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/admin/quiz/${editingId}`, form);
      } else {
        await api.post("/admin/quiz", form);
      }

      resetForm();
      fetchQuiz();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Gagal menyimpan quiz");
    }
  };

  /* ================= UTIL ================= */

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      course_id: "",
      quiz_category_id: "",
      time_limit_minutes: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const editQuiz = (quiz) => {
    setForm({
      title: quiz.title,
      description: quiz.description ?? "",
      course_id: quiz.course_id,
      quiz_category_id: quiz.quiz_category_id,
      time_limit_minutes: quiz.time_limit_minutes ?? "",
    });
    setEditingId(quiz.id);
    setShowForm(true);
  };
  
  const deleteQuiz = async (id) => {
    if (!confirm("Hapus quiz ini?")) return;
    await api.delete(`/admin/quiz/${id}`);
    fetchQuiz();
  };

  const openKelolaSoal = (quiz) => {
  setActiveQuiz(quiz);
  setShowQuestionModal(true);
};

  


  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Kelola Quiz</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <Plus className="rotate-0 hover:rotate-90 transition-transform duration-300" size={16} /> Tambah Quiz
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border bg-white rounded-lg">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Judul</th>
            <th className="p-3 text-left">Course</th>
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-center">Soal</th>
            <th className="p-3 text-center">Waktu</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {quizzes.map((q) => (
            <tr key={q.id} className="border-t text-sm">
              <td className="p-3 font-medium">{q.title}</td>

              <td className="p-3 text-gray-700">
                {q.course?.title || "-"}
              </td>

              <td className="p-3 text-gray-700">
                {q.category?.name || "-"}
              </td>

              <td className="p-3 text-center">
                <button
                  onClick={() => openKelolaSoal(q)}
                  className="text-purple-600 hover:underline"
                >
                  Kelola Soal
                </button>
              </td>
              <td className="p-3 text-center">
                {q.time_limit_minutes
                  ? `${q.time_limit_minutes} menit`
                  : "-"}
              </td>

              <td className="p-3 flex gap-3 justify-center">
                <button onClick={() => editQuiz(q)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => deleteQuiz(q.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {editingId ? "Edit Quiz" : "Tambah Quiz"}
              </h3>
              <button onClick={resetForm}>
                <X size={18} />
              </button>
            </div>

            <input
              placeholder="Judul Quiz"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <select
              value={form.course_id}
              onChange={(e) =>
                setForm({ ...form, course_id: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Pilih Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            <select
              value={form.quiz_category_id}
              onChange={(e) =>
                setForm({ ...form, quiz_category_id: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Pilih Kategori Quiz</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Deskripsi"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="number"
              placeholder="Time Limit (menit)"
              value={form.time_limit_minutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  time_limit_minutes: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <button
              onClick={submitForm}
              className="w-full bg-blue-600 text-black py-2 rounded flex justify-center gap-2"
            >
              <Save size={16} /> Simpan
            </button>
          </div>
        </div>
      )}

      {/* QUIZ QUESTIONS MODAL */}
      {showQuestionModal && activeQuiz && (
        <QuizQuestionsModal
          quiz={activeQuiz}
          onClose={() => {
            setShowQuestionModal(false);
            setActiveQuiz(null);
          }}
        />
      )}



    </div>
  );
}
