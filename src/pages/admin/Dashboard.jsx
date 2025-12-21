import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "./AdminLayout";
import "../../style/admin.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Users</h4>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h4>Courses</h4>
          <p>{stats.courses}</p>
        </div>

        <div className="stat-card">
          <h4>Materials</h4>
          <p>{stats.materials}</p>
        </div>

        <div className="stat-card">
          <h4>Quizzes</h4>
          <p>{stats.quizzes}</p>
        </div>
      </div>

      <div className="admin-separator"></div>

      <div className="activity-log">
        <h3>Aktivitas Terakhir</h3>
        <ul>
          <li>Admin menambahkan quiz baru</li>
          <li>Admin mengupdate materi</li>
          <li>User baru mendaftar</li>
        </ul>
      </div>
    </AdminLayout>
  );
}
