"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
const express_1 = require("express");
const inversify_config_1 = require("../../shared/containers/inversify.config");
const create_student_service_1 = require("./services/create-student.service");
const studentsRouter = (0, express_1.Router)();
exports.studentsRouter = studentsRouter;
studentsRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name)
            throw "name is a required field";
        if (!email)
            throw "email is a required field";
        if (!password)
            throw "password is a required field";
        const createStudentService = inversify_config_1.container.resolve(create_student_service_1.CreateStudentService);
        const student = await createStudentService.execute({
            name,
            email,
            password,
        });
        return response.status(200).json(student);
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({ error });
    }
});
