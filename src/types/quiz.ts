export interface QuizAnswer {
  questionId: number;
  value: string | string[];
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  userInfo: {
    name: string;
    email: string;
  };
  isCompleted: boolean;
  score: number;
}

export interface Question {
  id: number;
  type: 'text' | 'email' | 'single' | 'multiple' | 'textarea';
  question: string;
  options?: string[];
  required: boolean;
  placeholder?: string;
}

export interface ScoreResult {
  score: number;
  tier: 'Beginner' | 'Builder' | 'Influencer';
  title: string;
  description: string;
  recommendations: string[];
}