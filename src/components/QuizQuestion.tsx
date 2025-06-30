import React from 'react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  answer: string | string[] | undefined;
  onAnswerChange: (value: string | string[]) => void;
  error?: string;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
  error
}) => {
  const handleSingleChoice = (value: string) => {
    onAnswerChange(value);
  };

  const handleMultipleChoice = (value: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(a => a !== value)
      : [...currentAnswers, value];
    onAnswerChange(newAnswers);
  };

  const handleTextChange = (value: string) => {
    onAnswerChange(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
        {question.question}
      </h2>

      {question.type === 'text' && (
        <input
          type="text"
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
        />
      )}

      {question.type === 'email' && (
        <input
          type="email"
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
        />
      )}

      {question.type === 'textarea' && (
        <textarea
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
        />
      )}

      {question.type === 'single' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSingleChoice(option)}
              className={`w-full text-left px-6 py-4 text-lg rounded-xl border-2 transition-all duration-200 ${
                answer === option
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  answer === option ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                }`}>
                  {answer === option && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {question.type === 'multiple' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = Array.isArray(answer) && answer.includes(option);
            return (
              <button
                key={index}
                onClick={() => handleMultipleChoice(option)}
                className={`w-full text-left px-6 py-4 text-lg rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};