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
const QueueProvider_1 = require("../../../shared/containers/providers/QueueProvider/QueueProvider");
let EnrollCourseService = class EnrollCourseService {
    constructor(coursesRepository, studentsRepository, queueProvider) {
        this.coursesRepository = coursesRepository;
        this.studentsRepository = studentsRepository;
        this.queueProvider = queueProvider;
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
            this.queueProvider.sendMessage({
                queue_name: 'email-svc',
                message: JSON.stringify({
                    type: 'enroll-course',
                    email: user.email,
                    name: user.name,
                    course_name: course.name,
                })
            });
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
    __param(2, (0, inversify_1.inject)(QueueProvider_1.QueueProvider)),
    __metadata("design:paramtypes", [CoursesRepository_1.CoursesRepository,
        StudentsRepository_1.StudentsRepository,
        QueueProvider_1.QueueProvider])
], EnrollCourseService);
exports.EnrollCourseService = EnrollCourseService;
