import api from "../axios";

const quizCategoryService = {
  getQuizCategories: () => api.get("/admin/quiz-categories"),
  create: (data) => api.post("/admin/quiz-categories", data),
  update: (id, data) => api.put(`/admin/quiz-categories/${id}`, data),
  delete: (id) => api.delete(`/admin/quiz-categories/${id}`),
};

export default quizCategoryService;
