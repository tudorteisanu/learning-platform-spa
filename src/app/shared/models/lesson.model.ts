import { Question } from "./question.model";

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  content: LessonContent[];
}

export interface LessonContent {
  id: string;
  type: string;
  data: string;
  position: number;
}
