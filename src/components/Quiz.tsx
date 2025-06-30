import React, { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { QuizQuestion } from './QuizQuestion';
import { ProgressBar } from './ProgressBar';
import { Results } from './Results';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Quiz: React.FC = () => {
  const {
    quizState,
    result,
    currentQuestion,
    progress,
    nextQuestion,
    prevQuestion,
    setAnswer,
    getAnswer,
    completeQuiz,
    resetQuiz,
    isLastQuestion
  } = useQuiz();

  const [errors, setErrors] = useState<Record<number, string>>({});

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) return false;

    const answer = getAnswer(currentQuestion.id);
    
    if (currentQuestion.required) {
      if (!answer || 
          (typeof answer === 'string' && answer.trim() === '') ||
          (Array.isArray(answer) && answer.length === 0)) {
        setErrors(prev => ({
          ...prev,
          [currentQuestion.id]: 'This field is required'
        }));
        return false;
      }

      // Email validation
      if (currentQuestion.type === 'email' && typeof answer === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(answer)) {
          setErrors(prev => ({
            ...prev,
            [currentQuestion.id]: 'Please enter a valid email address'
          }));
          return false;
        }
      }
    }

    // Clear error if validation passes
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[currentQuestion.id];
      return newErrors;
    });

    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (isLastQuestion) {
        completeQuiz();
      } else {
        nextQuestion();
      }
    }
  };

  const handleAnswerChange = (value: string | string[]) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, value);
      // Clear error when user starts typing/selecting
      if (errors[currentQuestion.id]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[currentQuestion.id];
          return newErrors;
        });
      }
    }
  };

  if (result && quizState.isCompleted) {
    return (
      <Results
        result={result}
        userName={quizState.userInfo.name}
        onRestart={resetQuiz}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 font-medium">
                Question {quizState.currentQuestion + 1} of {9}
              </span>
              <span className="text-sm text-gray-600 font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <ProgressBar progress={progress} />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            <QuizQuestion
              question={currentQuestion}
              answer={getAnswer(currentQuestion.id)}
              onAnswerChange={handleAnswerChange}
              error={errors[currentQuestion.id]}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={quizState.currentQuestion === 0}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-purple-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span>{isLastQuestion ? 'Get My Score' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};