import { Router, Request, Response } from 'express';
import { container } from '@src/shared/containers/inversify.config'
import { CreateStudentService } from './services/create-student.service';

const studentsRouter = Router();

studentsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    if(!name) throw "name is a required field"
    if(!email) throw "email is a required field"
    if(!password) throw "password is a required field"

    const createStudentService = container.resolve(CreateStudentService);

    const student = await createStudentService.execute({
      name,
      email,
      password,
    });

    return response.status(200).json(student);
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error });
  }
});



export { studentsRouter };
