import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <Outlet />
      </div>
    </div>
  );
}
