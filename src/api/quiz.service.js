import api from "./axios";

const quizService = {
  getAll: () => api.get("/admin/quizzes"),
  create: (data) => api.post("/admin/quizzes", data),
  update: (id, data) => api.put(`/admin/quizzes/${id}`, data),
  delete: (id) => api.delete(`/admin/quizzes/${id}`)
};

export default quizService;