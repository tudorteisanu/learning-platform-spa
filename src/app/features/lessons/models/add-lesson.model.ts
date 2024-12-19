import { Lesson } from "src/app/shared/models/lesson.model";

export interface AddLesson extends Pick<Lesson, 'title'> { }
