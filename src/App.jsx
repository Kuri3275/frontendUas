import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/public/Home";
import Course from "./pages/public/Course";
import Profile from "./pages/public/Profile";
import Quiz from "./pages/public/Quiz";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
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
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
