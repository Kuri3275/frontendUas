import api from "../axios";

export default {
  getMyResults() {
    return api.get("/my-quiz-results");
  },

  getResultByQuizId(quizId) {
    return api.get(`/my-quiz-results?quiz_id=${quizId}`);
  }
};
