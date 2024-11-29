import { Option } from "./option.model";

export interface Question {
  id: string;
  questionText: string;
  options: Option[];
  correctAnswer: string | null;
}
