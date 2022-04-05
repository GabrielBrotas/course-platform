import { injectable, inject } from "inversify";
import jwt from 'jsonwebtoken'
import { IStudent } from '@src/modules/students/entities';
import { JWT_SECRET } from '@src/config/constants';
import { StudentsRepository } from '@src/modules/students/repositories/StudentsRepository';
import { HashProvider } from "@src/shared/containers/providers/HashProvider/HashProvider";

type IResponse = {
  user: IStudent
  token: string
}

@injectable()
export class AuthenticateUserService {

  constructor(
    @inject(HashProvider) private hashProvider: HashProvider
  ) {}

  public async execute(email: string, password: string): Promise<IResponse> {
    try {
      const studentsRepository = new StudentsRepository();

      const user = await studentsRepository.findByEmail(email);

      if (!user) throw new Error('Invalid email / password combination');

      const passwordMatched = await this.hashProvider.compare(password, user.password);

      if (!passwordMatched) throw new Error('Invalid email / password combination');

      const token = jwt.sign(
        { id: user.id, email: user.email, roles: user.roles },
        JWT_SECRET,
        {
          expiresIn: '1m'
        }
      );

      return { user, token }
    } catch(error: any) {
      throw String(error.message)
    }
  }
}

