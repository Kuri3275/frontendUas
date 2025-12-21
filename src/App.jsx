import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";

import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import KelolaKursus from "./pages/admin/KelolaKursus";
import KelolaMateri from "./pages/admin/KelolaMateri";
import KelolaQuiz from "./pages/admin/KelolaQuiz";
import KelolaKategori from "./pages/admin/KelolaKategori";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <KelolaKursus />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/materials"
          element={
            <AdminRoute>
              <KelolaMateri />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/quiz-categories"
          element={
            <AdminRoute>
              <KelolaKategori />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/quizzes"
          element={
            <AdminRoute>
              <KelolaQuiz />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
