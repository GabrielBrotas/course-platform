import { injectable, inject } from "inversify";
import { CourseOut, ICourseOut } from '../schemas/course';
import { CoursesRepository } from '../repositories/CoursesRepository';
import { CacheProvider } from "@src/shared/containers/providers/CacheProvider/CacheProvider";
import { LoggerProvider } from "@src/shared/containers/providers/LoggerProvider/LoggerProvider";


@injectable()
export class GetAllCourseService {

  constructor(
    @inject(CoursesRepository) private coursesRepository: CoursesRepository,
    @inject(CacheProvider) private cacheProvider: CacheProvider,
    @inject(LoggerProvider) private loggerProvider: LoggerProvider
  ) {}

  public async execute(): Promise<ICourseOut[]> {
    try {
      const coursesFromCache = await this.cacheProvider.recover<ICourseOut[]>('courses-list');

      if (coursesFromCache) {
        this.loggerProvider.debug({
          type: 'debug',
          message: `Courses from cache`,
          payload: {
            coursesFromCache
          }
        })

        return coursesFromCache;
      }

      const courses = await this.coursesRepository.findAll()

      const coursesFormated = courses.map(course => CourseOut.format(course))
      
      this.loggerProvider.debug({
        type: 'debug',
        message: `Courses from postgres`,
        payload: {
          coursesFormated
        }
      })

       await this.cacheProvider.save('courses-list', coursesFormated)

      return coursesFormated
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
