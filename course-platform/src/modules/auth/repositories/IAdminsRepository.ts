import { IAdmin } from '../schemas/admin';

export type ICreateAdminDTO = {
  name: string;
  email: string;
  password: string;
}

export interface IAdminsRepository {
  findById(id: number): Promise<IAdmin | null>;
  findByEmail(email: string): Promise<IAdmin | null>;
  create(admin: ICreateAdminDTO): Promise<IAdmin>;
}
