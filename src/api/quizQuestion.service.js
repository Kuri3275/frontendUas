import api from "./axios";

const quizQuestionService = {
  getQuizQuestions: (quizId) =>
    api.get(`/admin/quiz/${quizId}/questions`),

  createQuizQuestion: (quizId, data) =>
    api.post(`/admin/quiz/${quizId}/questions`, data),

  updateQuizQuestion: (id, data) =>
    api.put(`/admin/questions/${id}`, data),

  deleteQuizQuestion: (id) =>
    api.delete(`/admin/questions/${id}`)
};

export default quizQuestionService;
