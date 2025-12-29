import React from "react";
import { User, BookOpen, Settings, LogOut, Award, Clock } from "lucide-react";

export default function Profile() {
  // Data dummy untuk tampilan
  const user = {
    name: "Kang Tahu",
    email: "kangtahu@example.com",
    role: "Student",
    joined: "Desember 2025",
    avatar: "https://ui-avatars.com/api/?name=Kang+Tahu&background=4f46e5&color=fff",
  };

  const myCourses = [
    { id: 1, title: "Mastering React for Beginner", progress: 75, instructor: "Yogie" },
    { id: 2, title: "UI/UX Design with Figma", progress: 30, instructor: "Lordzyy" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR PROFIL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-50"
            />
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user.email}</p>
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {user.role}
            </div>
          </div>

          <div className="bg-white overflow-hidden rounded-3xl shadow-sm border border-gray-100">
            <nav className="flex flex-col">
              {[
                { icon: User, label: "Detail Profil", active: true },
                { icon: BookOpen, label: "Kelas Saya", active: false },
                { icon: Award, label: "Sertifikat", active: false },
                { icon: Settings, label: "Pengaturan", active: false },
              ].map((item, index) => (
                <button 
                  key={index} 
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                    item.active ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <button className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100">
                <LogOut size={18} />
                Keluar
              </button>
            </nav>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="lg:col-span-3 space-y-8">
          {/* Welcome Card */}
          <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">Halo, {user.name}! 👋</h1>
              <p className="text-indigo-100 italic">"Belajar hari ini, jadi ahli besok pagi."</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><BookOpen /></div>
              <div><p className="text-gray-500 text-xs">Kelas Aktif</p><p className="text-xl font-bold">2</p></div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center"><Clock /></div>
              <div><p className="text-gray-500 text-xs">Jam Belajar</p><p className="text-xl font-bold">12h</p></div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><Award /></div>
              <div><p className="text-gray-500 text-xs">Sertifikat</p><p className="text-xl font-bold">0</p></div>
            </div>
          </div>

          {/* List Kelas yang Diikuti */}
          <h3 className="text-xl font-bold text-gray-900">Kelas yang Sedang Diikuti</h3>
          <div className="grid gap-6">
            {myCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">IT</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-500">Mentor: {course.instructor}</p>
                  </div>
                </div>
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress Belajar</span>
                    <span className="font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition">
                  Lanjut Belajar
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}