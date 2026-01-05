import api from "../axios";

const quizService = {
  // Mengembalikan response utuh agar konsisten dengan service lain
  getQuiz: () => api.get("/admin/quiz"),
  create: (data) => api.post("/admin/quiz", data),
  update: (id, data) => api.put(`/admin/quiz/${id}`, data),
  delete: (id) => api.delete(`/admin/quiz/${id}`),
};

export default quizService;