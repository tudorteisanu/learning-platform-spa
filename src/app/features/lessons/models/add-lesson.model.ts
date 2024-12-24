import { Lesson } from "@/App/shared/models/lesson.model";

export interface AddLesson extends Pick<Lesson, 'title'> { }
