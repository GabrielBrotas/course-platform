import { StudentOut } from "@src/modules/students/schemas/student";
import { injectable, inject } from "inversify";
import { CourseOut, ICourse, ICourseOut } from '../schemas/course';
import { CoursesRepository } from '../repositories/CoursesRepository';

@injectable()
export class GetAllCourseService {

  constructor(
    @inject(CoursesRepository) private coursesRepository: CoursesRepository
  ) {}

  public async execute(): Promise<ICourseOut[]> {
    try {
      const courses = await this.coursesRepository.findAll()

      return courses.map(course => CourseOut.format(course))

    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
