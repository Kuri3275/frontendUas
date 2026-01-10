import api from "../axios";

const quizService = {
  // Fungsi untuk ambil semua quiz
  async getAllQuizzes() {
    const res = await api.get("/quiz"); // Sesuaikan endpoint ( /quiz atau /quizzes )
    return res; 
  },

  // Fungsi untuk ambil detail satu quiz
  async getQuizById(id) {
    const res = await api.get(`/quiz/${id}`);
    return res;
  }
};

export default quizService;