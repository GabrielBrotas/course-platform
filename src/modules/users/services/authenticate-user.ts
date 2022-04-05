import UsersRepository from '../repositories/UsersRepository';
import { IUser } from '../entities';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../config/constants';

type IResponse = {
  user: IUser
  token: string
}

class AuthenticateUserService {
  public async execute(email: string, password: string): Promise<IResponse> {
    try {
      const usersRepository = new UsersRepository();

      const user = await usersRepository.findByEmail(email);

      if (!user) throw new Error('Invalid email / password combination');

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched) throw new Error('Invalid email / password combination');

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: '1h'
        }

      );

      return { user, token }
    } catch(error: any) {
      throw String(error.message)
    }
  }
}

export default AuthenticateUserService
