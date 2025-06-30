import { useState } from 'react';
import { QuizState, QuizAnswer } from '../types/quiz';
import { questions } from '../data/questions';
import { calculateScore } from '../utils/scoring';

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    userInfo: { name: '', email: '' },
    isCompleted: false,
    score: 0
  });

  const [result, setResult] = useState(null);

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const setAnswer = (questionId: number, value: string | string[]) => {
    setQuizState(prev => {
      const existingAnswerIndex = prev.answers.findIndex(a => a.questionId === questionId);
      const newAnswer: QuizAnswer = { questionId, value };
      
      let newAnswers;
      if (existingAnswerIndex >= 0) {
        newAnswers = [...prev.answers];
        newAnswers[existingAnswerIndex] = newAnswer;
      } else {
        newAnswers = [...prev.answers, newAnswer];
      }

      // Update user info if it's name or email
      let newUserInfo = prev.userInfo;
      if (questionId === 1 && typeof value === 'string') {
        newUserInfo = { ...newUserInfo, name: value };
      } else if (questionId === 2 && typeof value === 'string') {
        newUserInfo = { ...newUserInfo, email: value };
      }

      return {
        ...prev,
        answers: newAnswers,
        userInfo: newUserInfo
      };
    });
  };

  const getAnswer = (questionId: number): string | string[] | undefined => {
    const answer = quizState.answers.find(a => a.questionId === questionId);
    return answer?.value;
  };

  const completeQuiz = () => {
    const scoreResult = calculateScore(quizState.answers);
    setResult(scoreResult);
    setQuizState(prev => ({
      ...prev,
      isCompleted: true,
      score: scoreResult.score
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      userInfo: { name: '', email: '' },
      isCompleted: false,
      score: 0
    });
    setResult(null);
  };

  return {
    quizState,
    result,
    currentQuestion: questions[quizState.currentQuestion],
    progress: ((quizState.currentQuestion + 1) / questions.length) * 100,
    nextQuestion,
    prevQuestion,
    setAnswer,
    getAnswer,
    completeQuiz,
    resetQuiz,
    isLastQuestion: quizState.currentQuestion === questions.length - 1
  };
};