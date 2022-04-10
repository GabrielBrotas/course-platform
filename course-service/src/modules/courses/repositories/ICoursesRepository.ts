import { ICourse } from '../schemas/course';

export type ICreateCourseDTO = {
  name: string;
}

export type IAddUserToCourseDTO = {
  userId: number;
  courseId: number;
}

export interface ICoursesRepository {
  findAll(): Promise<ICourse[]>;
  findById(id: number): Promise<ICourse | null>;
  findByName(name: string): Promise<ICourse | null>;
  create(user: ICreateCourseDTO): Promise<ICourse>;
  addUserToCourse(data: IAddUserToCourseDTO): Promise<boolean>;
}
