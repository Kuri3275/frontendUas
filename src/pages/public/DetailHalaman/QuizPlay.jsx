import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizService from "../../../api/user/quiz.service";
import quizQuestionService from "../../../api/user/quizQuestion.service";
import quizSubmitService from "../../../api/user/quizSubmit.service";

export default function QuizPlay() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // ================== FETCH QUIZ & QUESTIONS ==================
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const quizData = await quizService.getById(quizId);

        if (!quizData) {
          setError("Quiz tidak ditemukan");
          return;
        }

        if (quizData.is_completed) {
          navigate(`/quiz/result/${quizId}`, { replace: true });
          return;
        }

        setQuiz({
          id: quizData.id,
          title: quizData.title,
          time_limit_minutes: quizData.time_limit_minutes || 0,
        });

        setTimeLeft((quizData.time_limit_minutes || 0) * 60); // convert to seconds

        const questionRes = await quizQuestionService.getQuizQuestions(quizId);
        const payload = questionRes.data?.data;

        if (!payload?.questions) {
          setError("Soal quiz tidak tersedia");
          return;
        }

        setQuestions(payload.questions);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, navigate]);

  // ================== TIMER ==================
  useEffect(() => {
    if (timeLeft <= 0 || !quiz) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(); // auto submit jika waktu habis
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, quiz]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ================== HANDLE ANSWER ==================
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // ================== NAVIGATION ==================
  const nextQuestion = () => {
    if (!answers[questions[currentIndex].id]) {
      alert("Silakan pilih jawaban sebelum lanjut!");
      return;
    }
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // ================== SUBMIT QUIZ ==================
  const handleSubmit = async () => {
    if (!window.confirm("Yakin submit quiz?")) return;

    // ✅ Sesuaikan payload sesuai backend: pakai 'answer', bukan 'selected_answer'
    const payload = {
      answers: Object.entries(answers).map(([qid, ans]) => ({
        question_id: Number(qid),
        answer: ans.toUpperCase(), // wajib sesuai validasi backend
      })),
    };

    try {
      setSubmitting(true);
      const res = await quizSubmitService.submit(quizId, payload);

      navigate(`/quiz/result/${quizId}`, {
        state: res.data.data,
        replace: true,
      });
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Quiz ini sudah pernah kamu kerjakan");
        navigate(`/quiz/result/${quizId}`, { replace: true });
      } else if (err.response?.status === 422) {
        alert(err.response.data.message || "Semua soal wajib dijawab");
      } else {
        console.error(err);
        alert("Gagal submit quiz. Silakan coba lagi.");
      }
    } finally {
      setSubmitting(false);
    }
  };



  // ================== RENDER ==================
  if (loading) return <p className="pt-40 text-center">Loading quiz...</p>;
  if (error) return <p className="pt-40 text-center text-red-600">{error}</p>;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-3xl mx-auto pt-32 pb-20 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{quiz.title}</h2>
        <div className="text-lg font-bold bg-gray-100 px-4 py-2 rounded">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded mb-6">
        <div
          className="h-2 bg-indigo-600 rounded transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-10 p-6 bg-white rounded-xl shadow-md">
        <p className="font-semibold mb-4">
          {currentIndex + 1}. {currentQuestion.question_text}
        </p>

        {["a", "b", "c", "d"].map((opt) => (
          <label
            key={opt}
            className={`block mb-2 cursor-pointer px-3 py-2 rounded border ${
              answers[currentQuestion.id] === opt.toUpperCase()
                ? "bg-indigo-100 border-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name={`q-${currentQuestion.id}`}
              className="mr-2"
              checked={answers[currentQuestion.id] === opt.toUpperCase()}
              onChange={() =>
                handleAnswerChange(currentQuestion.id, opt.toUpperCase())
              }
            />
            {currentQuestion[`option_${opt}`]}
          </label>
        ))}
      </div>

      {/* Navigation / Submit */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-semibold"
        >
          Prev
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold"
          >
            {submitting ? "Mengirim..." : "Submit Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
