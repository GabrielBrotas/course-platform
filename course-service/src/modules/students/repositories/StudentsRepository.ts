import { injectable } from "inversify";
import { prisma } from '@src/shared/services/prisma'
import { ICreateStudentDTO, IStudentsRepository } from './IStudentsRepository'
import { IStudent } from "../schemas/student";

@injectable()
export class StudentsRepository implements IStudentsRepository {

  async findById(id: number): Promise<IStudent | null> {
    return await prisma.student.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string): Promise<IStudent | null> {
    return await prisma.student.findUnique({
      where: {
        email
      }
    })
  }

  async create(data: ICreateStudentDTO): Promise<IStudent> {
    return await prisma.student.create({
      data: {
        ...data,
        roles: ['student']
      }
    })
  }

}

