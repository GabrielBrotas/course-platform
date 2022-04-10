import { injectable, inject } from "inversify";
import jwt from 'jsonwebtoken'
import constants from '@src/config/constants';
import { StudentsRepository } from '@src/modules/students/repositories/StudentsRepository';
import { HashProvider } from "@src/shared/containers/providers/HashProvider/HashProvider";
import { AdminsRepository } from "../repositories/AdminsRepository";
import { IStudentOut, StudentOut } from "@src/modules/students/schemas/student";
import { LoggerProvider } from "@src/shared/containers/providers/LoggerProvider/LoggerProvider";

type IResponse = {
  user: IStudentOut
  token: string
}

@injectable()
export class AuthenticateUserService {

  constructor(
    @inject(HashProvider) private hashProvider: HashProvider,
    @inject(StudentsRepository) private studentsRepository: StudentsRepository,
    @inject(AdminsRepository) private adminsRepository: AdminsRepository,
    @inject(LoggerProvider) private loggerProvider: LoggerProvider
    ) {}

  public async execute(email: string, password: string, isAdmin = false): Promise<IResponse> {
    try {
      let user = null

      if(isAdmin) {
        this.loggerProvider.debug<{email: string}>({
          type: 'debug',
          message: `AuthenticateUserService: authenticating admin with email ${email}`,
          payload: {
            email
          }
        })
        user = await this.adminsRepository.findByEmail(email);
      } else {
        this.loggerProvider.debug<{email: string}>({
          type: 'debug',
          message: `AuthenticateUserService: authenticating user with email ${email}`,
          payload: {
            email
          }
        })
        user = await this.studentsRepository.findByEmail(email);
      }

      if (!user) throw new Error('Invalid email / password combination');

      const passwordMatched = await this.hashProvider.compare(password, user.password);
      if (!passwordMatched) throw new Error('Invalid email / password combination');

      const token = jwt.sign(
        { id: user.id, email: user.email, roles: user.roles, isAdmin },
        constants.JWT_SECRET,
        {
          expiresIn: '24h'
        }
      );
        
      return { 
        user: StudentOut.format(user), 
        token
      }
    } catch(error: any) {
      this.loggerProvider.error({
        type: 'debug',
        error: new Error('AuthenticateUserService: error authenticating user'),
        payload: {
          email
        }
      })
      throw String(error.message)
    }
  }
}

