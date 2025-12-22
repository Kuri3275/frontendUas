import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Users,
  BookOpen,
  FileText,
  HelpCircle
} from "lucide-react";

import "../../style/admin.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [animated, setAnimated] = useState({
    users: 0,
    courses: 0,
    materials: 0,
    quizzes: 0
  });

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  // counter animation
  useEffect(() => {
    if (!stats) return;

    const interval = setInterval(() => {
      setAnimated(prev => ({
        users: Math.min(prev.users + 1, stats.users),
        courses: Math.min(prev.courses + 1, stats.courses),
        materials: Math.min(prev.materials + 1, stats.materials),
        quizzes: Math.min(prev.quizzes + 1, stats.quizzes),
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [stats]);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <>
      <h2 className="admin-title">Dashboard</h2>

      <div className="stats-grid">
        <StatCard
          title="Users"
          value={animated.users}
          icon={<Users size={28} />}
          color="blue"
        />

        <StatCard
          title="Courses"
          value={animated.courses}
          icon={<BookOpen size={28} />}
          color="green"
        />

        <StatCard
          title="Materials"
          value={animated.materials}
          icon={<FileText size={28} />}
          color="orange"
        />

        <StatCard
          title="Quizzes"
          value={animated.quizzes}
          icon={<HelpCircle size={28} />}
          color="purple"
        />
      </div>
    </>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}
