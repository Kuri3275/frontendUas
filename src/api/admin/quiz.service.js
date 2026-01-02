import api from "../axios";

const quizService = {
  getQuiz: async () => {
    const res = await api.get("/admin/quiz");
    return res.data.data.data; // <- ambil array quiz yang sebenarnya
  },

  create: (data) => api.post("/admin/quiz", data),
  update: (id, data) => api.put(`/admin/quiz/${id}`, data),
  delete: (id) => api.delete(`/admin/quiz/${id}`),
};

export default quizService;
