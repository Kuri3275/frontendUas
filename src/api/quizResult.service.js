import api from "./axios";

const quizResultService = {
  getAll: () => api.get("/admin/quiz-results"),
  getById: (id) => api.get(`/admin/quiz-results/${id}`),
  create: (data) => api.post("/admin/quiz-results", data),
  update: (id, data) => api.put(`/admin/quiz-results/${id}`, data),
  delete: (id) => api.delete(`/admin/quiz-results/${id}`)
};

export default quizResultService;