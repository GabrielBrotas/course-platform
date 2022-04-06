import { container } from '@src/shared/containers/inversify.config';
import { ensureAuth } from '@src/shared/middlewares/ensureAuth';
import { Router, Request, Response } from 'express';

import { AuthenticateUserService } from './services/authenticate-user.service';
import { CreateAdminService } from './services/create-admin.service';
import { GetAuthenticatedUserService } from './services/get-authenticate-user.service';

const authRouter = Router();

authRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password, isAdmin = false } = request.body;

    if(!email) throw "email is a required field"
    if(!password) throw "password is a required field"

    const authStudentService = container.resolve(AuthenticateUserService)

    const result = await authStudentService.execute(email, password, isAdmin);

    return response.status(200).json(result);
  } catch (error) {
    return response.status(400).json({ error });
  }
});

authRouter.get('/', ensureAuth(), async (request: Request, response: Response) => {
  try {
    const getAuthenticatedUserService = container.resolve(GetAuthenticatedUserService)
    
    const result = await getAuthenticatedUserService.execute(request.user.id);

    return response.status(200).json(result);
  } catch (error) { 
    return response.status(400).json({ error });
  }
});

authRouter.post('/admin', ensureAuth(["admin"]), async (request: Request, response: Response) => {
  try {
    const { email, name, password } = request.body;

    if(!email) throw "email is a required field"
    if(!password) throw "password is a required field"

    const createAdminService = container.resolve(CreateAdminService)

    const result = await createAdminService.execute({email, name, password});

    return response.status(200).json(result);
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error });
  }
});

export { authRouter }
