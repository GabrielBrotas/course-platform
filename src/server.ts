import express from "express";
import usersRouter from './modules/users/routes';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
