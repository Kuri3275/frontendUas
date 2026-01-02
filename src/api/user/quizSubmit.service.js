import api from "../axios";

export default {
  submit: (quizId, payload) =>
    api.post(`/quiz/${quizId}/submit`, payload),
};
