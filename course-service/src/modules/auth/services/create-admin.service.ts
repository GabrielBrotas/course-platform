import { injectable, inject } from "inversify";
import { HashProvider } from "@src/shared/containers/providers/HashProvider/HashProvider";
import { AdminsRepository } from "../repositories/AdminsRepository";
import { AdminOut, IAdminOut } from "../schemas/admin";
import { ICreateAdminDTO } from "../repositories/IAdminsRepository";

@injectable()
export class CreateAdminService {

  constructor(
    @inject(HashProvider) private hashProvider: HashProvider,
    @inject(AdminsRepository) private adminsRepository: AdminsRepository
  ) {}

  public async execute({email, name, password}: ICreateAdminDTO): Promise<IAdminOut> {
    try {
      const emailAlreadyExists = await this.adminsRepository.findByEmail(email)
      if(!!emailAlreadyExists) throw new Error("Email already in use")

      const newPassword =  await this.hashProvider.hash(password)

      const admin = await this.adminsRepository.create({
        email,
        name,
        password: newPassword
      });

      return AdminOut.format(admin)
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
