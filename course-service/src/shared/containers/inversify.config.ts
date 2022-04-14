import { AdminsRepository } from "@src/modules/auth/repositories/AdminsRepository";
import { IAdminsRepository } from "@src/modules/auth/repositories/IAdminsRepository";
import { CoursesRepository } from "@src/modules/courses/repositories/CoursesRepository";
import { ICoursesRepository } from "@src/modules/courses/repositories/ICoursesRepository";
import { IStudentsRepository } from "@src/modules/students/repositories/IStudentsRepository";
import { StudentsRepository } from "@src/modules/students/repositories/StudentsRepository";
import { Container } from "inversify";

import { HashProvider } from "./providers/HashProvider/HashProvider";
import { IHashProvider } from './providers/HashProvider/IHashProvider'

import { LoggerProvider } from "./providers/LoggerProvider/LoggerProvider";
import { ILoggerProvider } from './providers/LoggerProvider/ILoggerProvider'
import { ICacheProvider } from "./providers/CacheProvider/ICacheProvider";
import { CacheProvider } from "./providers/CacheProvider/CacheProvider";

const container = new Container();

container.bind<IHashProvider>(HashProvider).toSelf().inSingletonScope();
container.bind<ILoggerProvider>(LoggerProvider).toSelf().inSingletonScope();
container.bind<ICacheProvider>(CacheProvider).toSelf().inSingletonScope();

container.bind<IStudentsRepository>(StudentsRepository).toSelf();
container.bind<IAdminsRepository>(AdminsRepository).toSelf();
container.bind<ICoursesRepository>(CoursesRepository).toSelf();

export { container }
