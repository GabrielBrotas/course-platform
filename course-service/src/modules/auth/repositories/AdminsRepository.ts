import { injectable } from "inversify";
import { prisma } from '@src/shared/services/prisma'
import { IAdminsRepository, ICreateAdminDTO } from "./IAdminsRepository";
import { IAdmin } from "../schemas/admin";

@injectable()
export class AdminsRepository implements IAdminsRepository {

  async findById(id: number): Promise<IAdmin | null> {
    return await prisma.admin.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    return await prisma.admin.findUnique({
      where: {
        email
      }
    })
  }

  async create(data: ICreateAdminDTO): Promise<IAdmin> {
    return await prisma.admin.create({
      data: {
        ...data,
        roles: ['admin']
      }
    })
  }

}

