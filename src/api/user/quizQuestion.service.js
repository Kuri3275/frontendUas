import api from "../axios"; // Ingat titik dua (..) karena axios ada di luar folder user

const quizQuestionService = {
  getQuestions: (quizId) => {
    return api.get(`/quiz/${quizId}/questions`);
  }
};

export default quizQuestionService;