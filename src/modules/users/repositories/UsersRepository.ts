import { prisma } from '../../../infra/prisma'
import { IUsersRepository, ICreateUserDTO } from './IUsersRepository'
import { IUser } from '../entities'

class UsersRepository implements IUsersRepository {

  async findById(id: number): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create(user: ICreateUserDTO): Promise<IUser> {
    return await prisma.user.create({
      data: {
        ...user
      }
    })
  }
}

export default UsersRepository
