import { injectable, inject } from "inversify";
import { ICourse } from '../schemas/course';
import { CoursesRepository } from '../repositories/CoursesRepository';
import { ICreateCourseDTO } from "../repositories/ICoursesRepository";

@injectable()
export class CreateCourseService {

  constructor(
    @inject(CoursesRepository) private coursesRepository: CoursesRepository
  ) {}

  public async execute({ name }: ICreateCourseDTO): Promise<ICourse> {
    try {
      const courseAlreadyExists = await this.coursesRepository.findByName(name)

      if(!!courseAlreadyExists) throw new Error("Course name already exists")

      const course = await this.coursesRepository.create({
        name,
      });

      return course
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
