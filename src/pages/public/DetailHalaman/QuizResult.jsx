import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import quizResultService from "../../../api/user/quizResult.service";
import { Trophy, CheckCircle, XCircle } from "lucide-react";

export default function QuizResult() {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizResultService
      .getMyResults()
      .then((res) => {
        const results = res.data.data ?? [];
        const found = results.find(
          (r) => r.quiz_id === Number(quizId)
        );
        setResult(found);
      })
      .catch(() => alert("Gagal memuat hasil quiz"))
      .finally(() => setLoading(false));
  }, [quizId]);

  if (loading) {
    return <div className="pt-40 text-center">Memuat hasil...</div>;
  }

  if (!result) {
    return <div className="pt-40 text-center">Hasil quiz tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow">

        <div className="flex items-center gap-4 mb-6">
          <Trophy className="text-yellow-500" size={40} />
          <h1 className="text-3xl font-extrabold">Hasil Quiz</h1>
        </div>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Skor:</strong>{" "}
            <span className="text-indigo-600 font-bold">
              {result.score}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            Jawaban Benar: {result.correct_count}
          </p>

          <p className="flex items-center gap-2">
            <XCircle className="text-red-500" />
            Total Soal: {result.total_questions}
          </p>
        </div>

        <div className="mt-10 flex justify-between">
          <Link to="/quiz">
            <button className="px-6 py-3 rounded-xl border font-bold">
              Kembali ke Quiz
            </button>
          </Link>

          <Link to="/profile">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold">
              Lihat Profil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
