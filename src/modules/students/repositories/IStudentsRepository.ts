import { IStudent } from "../schemas/student";

export type ICreateStudentDTO = {
  name: string;
  email: string;
  password: string;
}

export interface IStudentsRepository {
  findById(id: number): Promise<IStudent | null>;
  findByEmail(email: string): Promise<IStudent | null>;
  create(user: ICreateStudentDTO): Promise<IStudent>;
}
