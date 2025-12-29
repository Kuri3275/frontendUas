import React from "react";
import { HelpCircle, Timer, BookOpen, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuizList() {
  // Data dummy sesuai struktur Laravel kamu
  const quizes = [
    {
      id: 1,
      title: "Quiz Dasar Tailwind CSS",
      description: "Uji pemahamanmu tentang utility-first classes dan konfigurasi dasar.",
      time_limit_minutes: 15,
      category: "Frontend"
    },
    {
      id: 2,
      title: "Logika Dasar JavaScript",
      description: "Asah kemampuan problem solving dengan soal-soal fundamental JS.",
      time_limit_minutes: 20,
      category: "Programming"
    },

    {
      id: 3,
      title: "Logika Dasar JavaScript",
      description: "Asah kemampuan problem solving dengan soal-soal fundamental JS.",
      time_limit_minutes: 20,
      category: "Programming"
    },

    {
      id: 4,
      title: "Logika Dasar Tailwind",
      description: "Asah kemampuan problem solving dengan soal-soal fundamental JS.",
      time_limit_minutes: 20,
      category: "Programming"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Pusat Quiz</h1>
          <p className="text-gray-500 mt-2">Uji kemampuanmu dan dapatkan skor terbaik!</p>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quizes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <HelpCircle size={28} />
                </div>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">
                  {quiz.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{quiz.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed line-clamp-2">
                {quiz.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-600">
                  <Timer size={18} className="text-amber-500" />
                  <span className="font-medium text-sm">{quiz.time_limit_minutes} Menit</span>
                </div>

                <Link to={`/quiz/${quiz.id}`}>
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                    Mulai Quiz <Play size={16} fill="currentColor" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}