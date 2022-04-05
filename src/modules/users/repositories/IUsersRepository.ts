import { IUser } from '../entities';

export type ICreateUserDTO = {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: ICreateUserDTO): Promise<IUser>;
}
