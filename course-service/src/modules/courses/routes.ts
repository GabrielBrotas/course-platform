import { Router, Request, Response } from 'express';
import { container } from '@src/shared/containers/inversify.config'
import { ensureAuth } from '@src/shared/middlewares/ensureAuth';

import { CreateCourseService } from './services/create-course.service';
import { EnrollCourseService } from './services/enroll-course.service';
import { GetAllCourseService } from './services/get-all-course.service';

const coursesRouter = Router();

coursesRouter.get('/', async (request: Request, response: Response) => {
  try {
    const getAllCourseService = container.resolve(GetAllCourseService);

    const courses = await getAllCourseService.execute();

    return response.status(200).json({courses});
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error });
  }
})

coursesRouter.post('/', ensureAuth(['admin']), async (request: Request, response: Response) => {
  try {
    const { name } = request.body;

    if(!name) throw "name is a required field"

    const createCourseService = container.resolve(CreateCourseService);

    const course = await createCourseService.execute({
      name,
    });

    return response.status(200).json(course);
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error });
  }
});

coursesRouter.post('/enroll/:courseId', ensureAuth(['student']), async (request: Request, response: Response) => {
  try {
    const { courseId } = request.params;

    const enrollCourseService = container.resolve(EnrollCourseService);

    const result = await enrollCourseService.execute({
      courseId: Number(courseId),
      userId: Number(request.user.id),
    });

    return response.status(200).json(result);
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error });
  }
});

export { coursesRouter };
