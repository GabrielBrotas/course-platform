import { injectable } from "inversify";
import { prisma } from '@src/shared/services/prisma'
import { ICreateCourseDTO, ICoursesRepository, IAddUserToCourseDTO } from './ICoursesRepository'
import { ICourse } from '../schemas/course'

@injectable()
export class CoursesRepository implements ICoursesRepository {

  async findAll(): Promise<ICourse[]> {
    return await prisma.course.findMany({
      include: {
        students: true
      }
    })
  }

  async findById(id: number): Promise<ICourse | null> {
    return await prisma.course.findUnique({
      where: {
        id
      },
      include: {
        students: true
      }
    })
  }

  async findByName(name: string): Promise<ICourse | null> {
    return await prisma.course.findFirst({
      where: {
        name
      },
      include: {
        students: true
      }
    })
  }

  async create(data: ICreateCourseDTO): Promise<ICourse> {
    return await prisma.course.create({
      data: {
        ...data
      },
      include: {
        students: true
      }
    })
  }

  async addUserToCourse({courseId, userId}: IAddUserToCourseDTO): Promise<boolean> {
    await prisma.course.update({
      where: {
        id: courseId
      },
      data: {
        students: {
          connect: {
            id: userId
          }
        }
      }
    })

    return true
  }
}

