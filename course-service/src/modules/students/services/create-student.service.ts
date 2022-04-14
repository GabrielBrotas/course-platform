import { injectable, inject } from "inversify";
import { ICreateStudentDTO } from '../repositories/IStudentsRepository';
import { StudentsRepository } from '../repositories/StudentsRepository';
import { IStudentOut, StudentOut } from "../schemas/student";
import { HashProvider } from "@src/shared/containers/providers/HashProvider/HashProvider";
import { QueueProvider } from "@src/shared/containers/providers/QueueProvider/QueueProvider";

@injectable()
export class CreateStudentService {

  constructor(
    @inject(HashProvider) private hashProvider: HashProvider,
    @inject(StudentsRepository) private studentsRepository: StudentsRepository,
    @inject(QueueProvider) private queueProvider: QueueProvider
  ) {}

  public async execute({email, name, password}: ICreateStudentDTO): Promise<IStudentOut> {
    try {
      const emailAlreadyExists = await this.studentsRepository.findByEmail(email)

      if(!!emailAlreadyExists) throw new Error("Email already in use")

      const newPassword =  await this.hashProvider.hash(password)

      const student = await this.studentsRepository.create({
        email,
        name,
        password: newPassword
      });

      this.queueProvider.sendMessage({
        queue_name: 'email-svc',
        message: JSON.stringify({
          type: 'new-user',
          email,
          name,
        })
      })

      return StudentOut.format(student)
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
