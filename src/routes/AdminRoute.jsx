import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userRaw = localStorage.getItem("user");

  if (!userRaw) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userRaw);

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
