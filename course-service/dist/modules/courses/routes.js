"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = require("express");
const inversify_config_1 = require("../../shared/containers/inversify.config");
const ensureAuth_1 = require("../../shared/middlewares/ensureAuth");
const create_course_service_1 = require("./services/create-course.service");
const enroll_course_service_1 = require("./services/enroll-course.service");
const get_all_course_service_1 = require("./services/get-all-course.service");
const coursesRouter = (0, express_1.Router)();
exports.coursesRouter = coursesRouter;
coursesRouter.get('/', async (request, response) => {
    try {
        const getAllCourseService = inversify_config_1.container.resolve(get_all_course_service_1.GetAllCourseService);
        const courses = await getAllCourseService.execute();
        return response.status(200).json({ courses });
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({ error });
    }
});
coursesRouter.post('/', (0, ensureAuth_1.ensureAuth)(['admin']), async (request, response) => {
    try {
        const { name } = request.body;
        if (!name)
            throw "name is a required field";
        const createCourseService = inversify_config_1.container.resolve(create_course_service_1.CreateCourseService);
        const course = await createCourseService.execute({
            name,
        });
        return response.status(200).json(course);
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({ error });
    }
});
coursesRouter.post('/enroll/:courseId', (0, ensureAuth_1.ensureAuth)(['student']), async (request, response) => {
    try {
        const { courseId } = request.params;
        const enrollCourseService = inversify_config_1.container.resolve(enroll_course_service_1.EnrollCourseService);
        const result = await enrollCourseService.execute({
            courseId: Number(courseId),
            userId: Number(request.user.id),
        });
        return response.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({ error });
    }
});
