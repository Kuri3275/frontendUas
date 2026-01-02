import { useEffect, useState } from "react";
import { HelpCircle, Timer, Play } from "lucide-react";
import { Link } from "react-router-dom";

import quizService from "../../api/user/quiz.service";

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getAll(); // pastikan return array
        setQuizzes(data);
      } catch (err) {
        console.error(err);
        alert("Gagal memuat data quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div className="pt-40 text-center text-gray-500 font-medium">Memuat quiz...</div>;
  }

  if (!quizzes.length) {
    return <div className="pt-40 text-center text-gray-500 font-medium">Quiz belum tersedia</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Pusat Quiz</h1>
          <p className="text-gray-500 mt-2">
            Uji kemampuanmu dan dapatkan skor terbaik
          </p>
        </div>

        {/* QUIZ GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white p-8 rounded-[32px] border shadow-sm hover:shadow-xl transition"
            >
              {/* ICON + CATEGORY */}
              <div className="flex justify-between mb-6">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <HelpCircle size={28} />
                </div>
                <span className="px-4 py-1 bg-gray-100 rounded-full text-xs font-bold">
                  {quiz.category?.name ?? "-"}
                </span>
              </div>

              {/* TITLE + DESCRIPTION */}
              <h3 className="text-2xl font-bold mb-3">{quiz.title}</h3>
              <p className="text-gray-500 mb-8 line-clamp-2">
                {quiz.description ?? "Tidak ada deskripsi"}
              </p>

              {/* FOOTER: TIME + START BUTTON */}
              <div className="flex justify-between items-center pt-6 border-t">
                <div className="flex items-center gap-2 text-gray-600">
                  <Timer size={18} />
                  <span>{quiz.time_limit_minutes ?? 0} Menit</span>
                </div>

                <Link to={`/quiz/play/${quiz.id}`}>
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                    Mulai Quiz <Play size={16} />
                  </button>
                </Link>
              </div>

              {/* OPTIONAL: Course info */}
              {quiz.course?.title && (
                <div className="mt-4 text-sm text-gray-400">
                  Course: <span className="font-medium">{quiz.course.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
