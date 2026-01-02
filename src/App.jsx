import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Home from "./pages/public/Home";
import Profile from "./pages/public/Profile";
import Course from "./pages/public/Course";
import Materi from "./pages/public/Materi";
import Quiz from "./pages/public/Quiz";
import About from "./pages/public/About";

import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import KelolaCourse from "./pages/admin/KelolaCourse";
import KelolaMateri from "./pages/admin/KelolaMateri";
import KelolaKategoriQuiz from "./pages/admin/KelolaKategoriQuiz";
import KelolaQuiz from "./pages/admin/KelolaQuiz";
import QuizQuestionsModal from "./pages/admin/QuizQuestionsModal";
import QuizPlay from "./pages/public/DetailHalaman/Quizplay";
import QuizResult from "./pages/public/DetailHalaman/QuizResult";

function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Routes>

      {/* ===== AUTH (TANPA NAVBAR) ===== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ===== PUBLIC (PAKAI NAVBAR) ===== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/materi" element={<Materi />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz/play/:quizId" element={<QuizPlay />} />
        <Route path="/quiz/result/:quizId" element={<QuizResult />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/courses" element={<KelolaCourse />} />
        <Route path="/admin/materials" element={<KelolaMateri />} />
        <Route path="/admin/quiz-categories" element={<KelolaKategoriQuiz />} />
        <Route path="/admin/quizzes" element={<KelolaQuiz />} />
      </Route>
    </Route>


    </Routes>
    </>
  );
}

export default App;
