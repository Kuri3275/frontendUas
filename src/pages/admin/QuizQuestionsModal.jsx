import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import toast from "react-hot-toast";
import quizQuestionService from "../../api/quizQuestion.service";

export default function QuizQuestionsModal({ quiz, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "a"
  });

  /* ================= FETCH ================= */

  const fetchQuestions = async () => {
    try {
      const res = await quizQuestionService.getQuizQuestions(quiz.id);
      setQuestions(res.data.data || []);
    } catch {
      toast.error("Gagal mengambil soal");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quiz.id]);

  /* ================= SUBMIT ================= */

  const submitForm = async () => {
    if (!form.question_text || !form.option_a || !form.option_b) {
      toast.error("Pertanyaan, opsi A, dan opsi B wajib diisi");
      return;
    }

    if ( (form.correct_answer === "c" && !form.option_c) ||
         (form.correct_answer === "d" && !form.option_d) 
        ){
      toast.error("Jawaban benar tidak boleh menunjuk opsi kosong");
      return;
    }
    try {
      if (editingId) {
        await quizQuestionService.updateQuizQuestion(editingId, form);
        toast.success("Soal berhasil diperbarui");
      } else {
        await quizQuestionService.createQuizQuestion(
          quiz.id,
          form
        );
        toast.success("Soal berhasil ditambahkan");
      }

      resetForm();
      fetchQuestions();
    } catch {
      toast.error("Gagal menyimpan soal");
    }
  };

  /* ================= UTIL ================= */

  const resetForm = () => {
    setForm({
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "a"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const editQuestion = (q) => {
    setForm({
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c ?? "",
      option_d: q.option_d ?? "",
      correct_answer: q.correct_answer
    });
    setEditingId(q.id);
    setShowForm(true);
  };

  const deleteQuestion = async (id) => {
  if (!confirm("Hapus soal ini?")) return;

  try {
    await quizQuestionService.deleteQuizQuestion(id);
    toast.success("Soal dihapus");
    fetchQuestions();
  } catch {
    toast.error("Gagal menghapus soal");
  }
};


  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Kelola Soal — {quiz.title}
          </h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* ACTION */}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded"
        >
          <Plus size={16} /> Tambah Soal
        </button>

        {/* TABLE */}
        <table className="w-full border rounded text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Pertanyaan</th>
              <th className="p-2 text-center">Jawaban</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="p-2">{q.question_text}</td>
                <td className="p-2 text-center uppercase">
                  {q.correct_answer}
                </td>
                <td className="p-2 flex justify-center gap-2">
                  <button onClick={() => editQuestion(q)}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => deleteQuestion(q.id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FORM */}
        {showForm && (
          <div className="border rounded p-4 space-y-3 bg-gray-50">
            <textarea
              placeholder="Pertanyaan"
              value={form.question_text}
              onChange={(e) =>
                setForm({ ...form, question_text: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            {["a","b","c","d"].map((opt) => (
              <input
                key={opt}
                placeholder={`Opsi ${opt.toUpperCase()}`}
                value={form[`option_${opt}`]}
                onChange={(e) =>
                  setForm({ ...form, [`option_${opt}`]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            ))}

            <select
              value={form.correct_answer}
              onChange={(e) =>
                setForm({ ...form, correct_answer: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="a">Jawaban A</option>
              <option value="b">Jawaban B</option>

              <option value="c" disabled={!form.option_c}>
                Jawaban C
              </option>

              <option value="d" disabled={!form.option_d}>
                Jawaban D
              </option>
            </select>

            <div className="flex gap-2 justify-end">
              <button onClick={resetForm} className="px-3 py-1 border rounded">
                Batal
              </button>
              <button
                onClick={submitForm}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                <Save size={14} /> Simpan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
