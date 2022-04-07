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
exports.GetAuthenticatedUserService = void 0;
const student_1 = require("../../students/schemas/student");
const inversify_1 = require("inversify");
const StudentsRepository_1 = require("../../students/repositories/StudentsRepository");
const AdminsRepository_1 = require("../repositories/AdminsRepository");
const admin_1 = require("../schemas/admin");
let GetAuthenticatedUserService = class GetAuthenticatedUserService {
    constructor(studentsRepository, adminsRepository) {
        this.studentsRepository = studentsRepository;
        this.adminsRepository = adminsRepository;
    }
    async execute(id) {
        try {
            let user = null;
            user = await this.studentsRepository.findById(id);
            if (user)
                return student_1.StudentOut.format(user);
            user = await this.adminsRepository.findById(id);
            if (user)
                return admin_1.AdminOut.format(user);
            throw new Error("User not found");
        }
        catch (error) {
            console.log(error);
            throw String(error.message);
        }
    }
};
GetAuthenticatedUserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(StudentsRepository_1.StudentsRepository)),
    __param(1, (0, inversify_1.inject)(AdminsRepository_1.AdminsRepository)),
    __metadata("design:paramtypes", [StudentsRepository_1.StudentsRepository,
        AdminsRepository_1.AdminsRepository])
], GetAuthenticatedUserService);
exports.GetAuthenticatedUserService = GetAuthenticatedUserService;
