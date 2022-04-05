import { IStudentsRepository } from "@src/modules/students/repositories/IStudentsRepository";
import { StudentsRepository } from "@src/modules/students/repositories/StudentsRepository";
import { Container } from "inversify";

import { HashProvider } from "./providers/HashProvider/HashProvider";
import { IHashProvider } from './providers/HashProvider/IHashProvider'

const container = new Container();

container.bind<IHashProvider>(HashProvider).toSelf()
container.bind<IStudentsRepository>(StudentsRepository).toSelf()

export { container }
