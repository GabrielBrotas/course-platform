"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseService = void 0;
const inversify_1 = require("inversify");
const CoursesRepository_1 = require("../repositories/CoursesRepository");
const CacheProvider_1 = require("../../../shared/containers/providers/CacheProvider/CacheProvider");
const LoggerProvider_1 = require("../../../shared/containers/providers/LoggerProvider/LoggerProvider");
let CreateCourseService = class CreateCourseService {
    constructor(coursesRepository, cacheProvider, loggerProvider) {
        this.coursesRepository = coursesRepository;
        this.cacheProvider = cacheProvider;
        this.loggerProvider = loggerProvider;
    }
    async execute({ name }) {
        try {
            const courseAlreadyExists = await this.coursesRepository.findByName(name);
            if (!!courseAlreadyExists)
                throw new Error("Course name already exists");
            const course = await this.coursesRepository.create({
                name,
            });
            await this.cacheProvider.invalidate('courses-list');
            this.loggerProvider.debug({
                type: 'debug',
                message: `Invalidated courses-list cache`,
            });
            return course;
        }
        catch (error) {
            console.log(error);
            throw String(error.message);
        }
    }
};
CreateCourseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(CoursesRepository_1.CoursesRepository)),
    __param(1, (0, inversify_1.inject)(CacheProvider_1.CacheProvider)),
    __param(2, (0, inversify_1.inject)(LoggerProvider_1.LoggerProvider)),
    __metadata("design:paramtypes", [CoursesRepository_1.CoursesRepository,
        CacheProvider_1.CacheProvider,
        LoggerProvider_1.LoggerProvider])
], CreateCourseService);
exports.CreateCourseService = CreateCourseService;
