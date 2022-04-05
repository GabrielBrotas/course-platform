import { injectable, inject } from "inversify";
import { IStudent } from '../entities';
import { ICreateStudentDTO } from '../repositories/IStudentsRepository';
import { StudentsRepository } from '../repositories/StudentsRepository';
import { HashProvider } from "@src/shared/containers/providers/HashProvider/HashProvider";

@injectable()
export class CreateStudentService {

  constructor(
    @inject(HashProvider) private hashProvider: HashProvider,
    @inject(StudentsRepository) private studentsRepository: StudentsRepository
  ) {}

  public async execute({email, name, password}: ICreateStudentDTO): Promise<Partial<IStudent>> {
    try {
      const emailAlreadyExists = await this.studentsRepository.findByEmail(email)

      if(!!emailAlreadyExists) throw new Error("Email already in use")

      const newPassword =  await this.hashProvider.hash(password)

      const student = await this.studentsRepository.create({
        email,
        name,
        password: newPassword
      });

      return student
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
