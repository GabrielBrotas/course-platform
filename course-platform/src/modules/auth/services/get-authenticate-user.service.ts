import { IStudentOut, StudentOut } from "@src/modules/students/schemas/student";
import { injectable, inject } from "inversify";
import { StudentsRepository } from '../../students/repositories/StudentsRepository';
import { AdminsRepository } from "../repositories/AdminsRepository";
import { AdminOut, IAdminOut } from "../schemas/admin";

@injectable()
export class GetAuthenticatedUserService {

  constructor(
    @inject(StudentsRepository) private studentsRepository: StudentsRepository,
    @inject(AdminsRepository) private adminsRepository: AdminsRepository
  ) {}

  public async execute(id: number): Promise<IAdminOut | IStudentOut> {
    try {
      let user = null

      user = await this.studentsRepository.findById(id)
      if(user) return StudentOut.format(user)

      user = await this.adminsRepository.findById(id)
      if(user) return AdminOut.format(user)

      throw new Error("User not found")
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
