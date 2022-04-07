"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const inversify_config_1 = require("../../shared/containers/inversify.config");
const ensureAuth_1 = require("../../shared/middlewares/ensureAuth");
const express_1 = require("express");
const authenticate_user_service_1 = require("./services/authenticate-user.service");
const create_admin_service_1 = require("./services/create-admin.service");
const get_authenticate_user_service_1 = require("./services/get-authenticate-user.service");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/', async (request, response) => {
    try {
        const { email, password, isAdmin = false } = request.body;
        if (!email)
            throw "email is a required field";
        if (!password)
            throw "password is a required field";
        const authStudentService = inversify_config_1.container.resolve(authenticate_user_service_1.AuthenticateUserService);
        const result = await authStudentService.execute(email, password, isAdmin);
        return response.status(200).json(result);
    }
    catch (error) {
        return response.status(400).json({ error });
    }
});
authRouter.get('/', (0, ensureAuth_1.ensureAuth)(), async (request, response) => {
    try {
        const getAuthenticatedUserService = inversify_config_1.container.resolve(get_authenticate_user_service_1.GetAuthenticatedUserService);
        const result = await getAuthenticatedUserService.execute(request.user.id);
        return response.status(200).json(result);
    }
    catch (error) {
        return response.status(400).json({ error });
    }
});
authRouter.post('/admin', (0, ensureAuth_1.ensureAuth)(["admin"]), async (request, response) => {
    try {
        const { email, name, password } = request.body;
        if (!email)
            throw "email is a required field";
        if (!password)
            throw "password is a required field";
        const createAdminService = inversify_config_1.container.resolve(create_admin_service_1.CreateAdminService);
        const result = await createAdminService.execute({ email, name, password });
        return response.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({ error });
    }
});
