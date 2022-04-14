import { injectable, inject } from "inversify";
import { ICourse } from '../schemas/course';
import { CoursesRepository } from '../repositories/CoursesRepository';
import { ICreateCourseDTO } from "../repositories/ICoursesRepository";
import { CacheProvider } from "@src/shared/containers/providers/CacheProvider/CacheProvider";
import { LoggerProvider } from "@src/shared/containers/providers/LoggerProvider/LoggerProvider";

@injectable()
export class CreateCourseService {

  constructor(
    @inject(CoursesRepository) private coursesRepository: CoursesRepository,
    @inject(CacheProvider) private cacheProvider: CacheProvider,
    @inject(LoggerProvider) private loggerProvider: LoggerProvider

  ) {}

  public async execute({ name }: ICreateCourseDTO): Promise<ICourse> {
    try {
      const courseAlreadyExists = await this.coursesRepository.findByName(name)

      if(!!courseAlreadyExists) throw new Error("Course name already exists")

      const course = await this.coursesRepository.create({
        name,
      });

      await this.cacheProvider.invalidate('courses-list')

      this.loggerProvider.debug({
        type: 'debug',
        message: `Invalidated courses-list cache`,
      })

      return course
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
