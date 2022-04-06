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
exports.CreateStudentService = void 0;
const inversify_1 = require("inversify");
const StudentsRepository_1 = require("../repositories/StudentsRepository");
const HashProvider_1 = require("../../../shared/containers/providers/HashProvider/HashProvider");
const student_1 = require("../schemas/student");
let CreateStudentService = class CreateStudentService {
    constructor(hashProvider, studentsRepository) {
        this.hashProvider = hashProvider;
        this.studentsRepository = studentsRepository;
    }
    async execute({ email, name, password }) {
        try {
            const emailAlreadyExists = await this.studentsRepository.findByEmail(email);
            if (!!emailAlreadyExists)
                throw new Error("Email already in use");
            const newPassword = await this.hashProvider.hash(password);
            const student = await this.studentsRepository.create({
                email,
                name,
                password: newPassword
            });
            return student_1.StudentOut.format(student);
        }
        catch (error) {
            console.log(error);
            throw String(error.message);
        }
    }
};
CreateStudentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(HashProvider_1.HashProvider)),
    __param(1, (0, inversify_1.inject)(StudentsRepository_1.StudentsRepository)),
    __metadata("design:paramtypes", [HashProvider_1.HashProvider,
        StudentsRepository_1.StudentsRepository])
], CreateStudentService);
exports.CreateStudentService = CreateStudentService;
