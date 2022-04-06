import "reflect-metadata";
import express from "express";

import { studentsRouter } from '@src/modules/students/routes';
import { authRouter } from '@src/modules/auth/routes';
import { coursesRouter } from '@src/modules/courses/routes';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
