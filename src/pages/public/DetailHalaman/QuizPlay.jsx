import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import quizQuestionService from "../../../api/user/quizQuestion.service";
import quizSubmitService from "../../../api/user/quizSubmit.service";

//import api from "axios";

/*const quizSubmitService = {
  submitQuiz: (quizId, answers) => {
    // Sesuaikan endpoint ini dengan rute di Laravel kamu
    return api.post(`/quiz/${quizId}/submit`, { answers });
  }
};*/



export default function QuizPlay() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [quizInfo, setQuizInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. STATE UNTUK MENYIMPAN JAWABAN USER
  // Formatnya: { id_soal: "pilihan" } -> contoh: { 1: "a", 2: "c" }
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await quizQuestionService.getQuestions(quizId);
        if (res.data && res.data.success) {
          const dataSoal = res.data.data.questions || [];
          setQuestions(dataSoal);
          setQuizInfo(res.data.data);
        }
      } catch (err) {
        toast.error("Gagal mengambil soal");
      } finally {
        setLoading(false);
      }
    };
    if (quizId) fetchQuestions();
  }, [quizId]);

  // 2. FUNGSI SAAT OPSI DIKLIK
  const handleOptionClick = (questionId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey, // simpan/update jawaban untuk soal ini
    }));
  };

  // 3. FUNGSI SUBMIT (Sementara console log dulu)
  const handleSubmit = async () => {
    const totalSoal = questions.length;
    const jumlahDijawab = Object.keys(answers).length;

    if (jumlahDijawab < totalSoal) {
      return toast.error(`Selesaikan semua soal! (${jumlahDijawab}/${totalSoal})`);
    }

    try {
      setLoading(true);
      
      // UBAH FORMAT DISINI:
      // Dari { "1": "a" } menjadi [{ "question_id": 1, "answer": "a" }]
      const formattedAnswers = Object.entries(answers).map(([id, choice]) => ({
        question_id: parseInt(id),
        answer: choice
      }));

      // Kirim format yang sudah benar ke service
      const response = await quizSubmitService.submitQuiz(quizId, formattedAnswers);

      if (response.data.success) {
        toast.success("Kuis Berhasil Dikirim!");
        navigate(`/quiz/result/${quizId}`); 
      }
    } catch (err) {
      console.error("Submit Error:", err.response?.data);
      // Menampilkan pesan error spesifik dari Laravel jika ada
      const errMsg = err.response?.data?.message || "Gagal mengirim jawaban";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="min-h-screen bg-[#0F172A] text-emerald-500 flex items-center justify-center italic">LOADING_SYSTEM...</div>;

  return (
    <div className="bg-[#0F172A] min-h-screen p-6 text-slate-200 pt-24">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-white italic uppercase tracking-tighter">
            {quizInfo?.title} <span className="text-emerald-500">#{quizId}</span>
          </h1>
          <p className="text-slate-500 text-xs mt-2 font-mono">PILIH SALAH SATU JAWABAN TERBAIK</p>
        </div>

        {questions.map((q, index) => (
          <div key={q.id} className="bg-[#1E293B] border border-slate-800 rounded-[25px] p-6 shadow-xl">
            <div className="flex gap-4 mb-6">
              <span className="flex-none w-8 h-8 bg-emerald-500 text-[#0F172A] rounded-lg flex items-center justify-center font-black">
                {index + 1}
              </span>
              <p className="font-semibold text-lg text-white leading-relaxed">{q.question_text}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 ml-0 md:ml-12">
              {["a", "b", "c", "d"].map((optKey) => {
                const isSelected = answers[q.id] === optKey; // Cek apakah opsi ini dipilih user
                
                return (
                  <button
                    key={optKey}
                    onClick={() => handleOptionClick(q.id, optKey)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center group ${
                      isSelected 
                        ? "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <span className={`w-8 font-bold ${isSelected ? "text-emerald-500" : "text-slate-600"}`}>
                      {optKey.toUpperCase()}.
                    </span>
                    <span>{q[`option_${optKey}`]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="pt-10 pb-20">
          <button 
            onClick={handleSubmit}
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-[#0F172A] font-black text-xl rounded-2xl transition-all active:scale-[0.98]"
          >
            SUBMIT_AND_FINISH
          </button>
        </div>
      </div>
    </div>
  );
}