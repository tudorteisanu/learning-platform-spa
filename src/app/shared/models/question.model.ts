export interface Question {
  id: number;
  lessonId: number;
  questionText: string;
  answers: number[];
  correctAnswer: number;
  userAnswer: number | null;
}
