import api from "../axios";

const quizPlayService = {
  /**
   * Ambil soal quiz untuk user (tanpa jawaban benar)
   * GET /quiz/{id}/questions
   */
  getQuizQuestions(quizId) {
    return api.get(`/quiz/${quizId}/questions`);
  },

  /**
   * Submit jawaban quiz user
   * POST /quiz/{id}/submit
   * payload: { answers: { question_id: "a" } }
   */
  submitQuiz(quizId, payload) {
    return api.post(`/quiz/${quizId}/submit`, payload);
  },
};

export default quizPlayService;
