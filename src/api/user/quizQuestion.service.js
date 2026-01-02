import api from "../axios";

export default {
  getQuizQuestions: (quizId) =>
    api.get(`/quiz/${quizId}/questions`),
};
