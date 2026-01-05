export type UserRole = 'admin' | 'teacher' | 'student';

export type User = {
  id: string;
  login: string;
  name: string;
  role: UserRole;
  grade?: number;
  subscriptionMinutes?: number;
  usedMinutes?: number;
  createdBy?: string;
};

export type Subject = {
  id: string;
  name: string;
  grade: number;
  quarter: number;
  description?: string;
  videoUrl?: string;
  documentUrl?: string;
};

export type Question = {
  id: number;
  text: string;
  correctAnswer: string;
  points: number;
};

export type Test = {
  id: string;
  subject: string;
  topic: string;
  grade: number;
  variant: number;
  questions: Question[];
  timeLimit: number;
  totalPoints: number;
  createdBy: string;
};

export type TestAnswer = {
  questionId: number;
  answer: string;
  submittedAt: Date;
};

export type TestSubmission = {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  answers: TestAnswer[];
  score: number | null;
  startedAt: Date;
  submittedAt?: Date;
  timeLeft?: number;
  checkedBy?: string;
  allowRetake?: boolean;
  isLocked: boolean;
  hasError?: boolean;
  errorDescription?: string;
};

export type LiveSession = {
  studentId: string;
  testId: string;
  currentQuestion: number;
  answers: TestAnswer[];
  lastActivity: Date;
};

export type GameCourse = {
  id: string;
  name: string;
  type: 'chess' | 'checkers' | 'minecraft';
  lessons: {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
  }[];
};
