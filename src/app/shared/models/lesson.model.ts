import { Content } from "./content.model";
import { Question } from "./question.model";

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  questions: Question[];
  content: Content[];
}
