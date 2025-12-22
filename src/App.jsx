import { Routes, Route, Navigate } from "react-router-dom";

/* LAYOUTS */
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

/* PUBLIC PAGES */
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Quiz from "./pages/public/Quiz";
import Profile from "./pages/public/Profile";

/* ADMIN PAGES */
import Dashboard from "./pages/admin/Dashboard";
import KelolaCourse from "./pages/admin/KelolaCourse";
import KelolaMateri from "./pages/admin/KelolaMateri";
import KelolaQuiz from "./pages/admin/KelolaQuiz";
import KelolaKategoriQuiz from "./pages/admin/KelolaKategoriQuiz";

/* ROUTE GUARD */
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Routes>

      {/* ===== PUBLIC LAYOUT ===== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ===== ADMIN LAYOUT ===== */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<KelolaCourse />} />
        <Route path="materials" element={<KelolaMateri />} />
        <Route path="quizzes" element={<KelolaQuiz />} />
        <Route path="quiz-categories" element={<KelolaKategoriQuiz />} />
      </Route>

    </Routes>
  );
}

export default App;
