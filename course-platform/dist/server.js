"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./modules/students/routes");
const routes_2 = require("./modules/auth/routes");
const routes_3 = require("./modules/courses/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', routes_2.authRouter);
app.use('/students', routes_1.studentsRouter);
app.use('/courses', routes_3.coursesRouter);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
