import { Router, Request, Response } from 'express';

import CreateUserService from './services/create-user';
import AuthenticateUserService from './services/authenticate-user';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    if(!name) throw "name is a required field"
    if(!email) throw "email is a required field"
    if(!password) throw "password is a required field"

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(200).json(user);
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error });
  }
});

usersRouter.post('/auth', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    if(!email) throw "email is a required field"
    if(!password) throw "password is a required field"

    const findUserByEmail = new AuthenticateUserService();

    const result = await findUserByEmail.execute(email, password);

    return response.status(200).json(result);
  } catch (error) {
    return response.status(400).json({ error });
  }
});

export default usersRouter;
