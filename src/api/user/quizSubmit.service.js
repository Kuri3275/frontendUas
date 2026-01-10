import api from "../axios";

const quizSubmitService = {
  submitQuiz: (quizId, formattedAnswers) => {
    // Kirim langsung array formattedAnswers ke body 'answers'
    return api.post(`/quiz/${quizId}/submit`, { 
      answers: formattedAnswers 
    });
  }
};

export default quizSubmitService;