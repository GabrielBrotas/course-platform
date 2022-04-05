import bcrypt from 'bcrypt'
import { IUser } from '../entities';
import { ICreateUserDTO } from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

class CreateUserService {
  public async execute({email, name, password}: ICreateUserDTO): Promise<Partial<IUser>> {
    try {
      const usersRepository = new UsersRepository();

      const emailAlreadyExists = await usersRepository.findByEmail(email)

      if(!!emailAlreadyExists) throw new Error("Email already in use")

      const newPassword =  await bcrypt.hash(password, 8)

      const user = await usersRepository.create({
        email,
        name,
        password: newPassword
      });

      return user
    } catch(error: any) {
      console.log(error)
      throw String(error.message)
    }
  }
}

export default CreateUserService
