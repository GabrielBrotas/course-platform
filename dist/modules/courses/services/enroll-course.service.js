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
exports.EnrollCourseService = void 0;
const inversify_1 = require("inversify");
const CoursesRepository_1 = require("../repositories/CoursesRepository");
const StudentsRepository_1 = require("../../students/repositories/StudentsRepository");
let EnrollCourseService = class EnrollCourseService {
    constructor(coursesRepository, studentsRepository) {
        this.coursesRepository = coursesRepository;
        this.studentsRepository = studentsRepository;
    }
    async execute({ userId, courseId }) {
        try {
            const user = await this.studentsRepository.findById(userId);
            if (!user)
                throw new Error("User not found");
            const course = await this.coursesRepository.findById(courseId);
            if (!course)
                throw new Error("Course not found");
            await this.coursesRepository.addUserToCourse({ courseId, userId });
        }
        catch (error) {
            console.log(error);
            throw String(error.message);
        }
    }
};
EnrollCourseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(CoursesRepository_1.CoursesRepository)),
    __param(1, (0, inversify_1.inject)(StudentsRepository_1.StudentsRepository)),
    __metadata("design:paramtypes", [CoursesRepository_1.CoursesRepository,
        StudentsRepository_1.StudentsRepository])
], EnrollCourseService);
exports.EnrollCourseService = EnrollCourseService;
