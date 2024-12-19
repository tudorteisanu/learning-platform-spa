import { Answer } from "./answer.model";

export interface Question {
  id: string;
  lessonId: string;
  questionText: string;
  answers: Answer[];
  correctAnswer: string;
  userAnswer: string | null;
}
