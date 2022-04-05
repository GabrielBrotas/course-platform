import { injectable, inject } from "inversify";
import { IStudent } from '../../students/entities';
import { StudentsRepository } from '../../students/repositories/StudentsRepository';

@injectable()
export class GetAuthenticatedStudentService {

  constructor(
    @inject(StudentsRepository) private studentsRepository: StudentsRepository
  ) {}

  public async execute(id: number): Promise<Partial<IStudent>> {
    try {
      const student = await this.studentsRepository.findById(id)

      if(!student) throw new Error("Student not found")

      return student
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}
