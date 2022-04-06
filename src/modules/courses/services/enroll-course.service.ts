import { injectable, inject } from "inversify";
import { CoursesRepository } from "@src/modules/courses/repositories/CoursesRepository";
import { StudentsRepository } from "@src/modules/students/repositories/StudentsRepository";

type IRequest = {
    userId: number;
    courseId: number;
}

@injectable()
export class EnrollCourseService {

  constructor(
    @inject(CoursesRepository) private coursesRepository: CoursesRepository,
    @inject(StudentsRepository) private studentsRepository: StudentsRepository
  ) {}

  public async execute({userId, courseId}: IRequest): Promise<any> {
    try {
      const user = await this.studentsRepository.findById(userId);
      if(!user) throw new Error("User not found");

      const course = await this.coursesRepository.findById(courseId);
      if(!course) throw new Error("Course not found");

      await this.coursesRepository.addUserToCourse({courseId, userId});
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
