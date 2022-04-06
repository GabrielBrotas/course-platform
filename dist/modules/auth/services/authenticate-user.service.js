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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../../config/constants");
const StudentsRepository_1 = require("../../students/repositories/StudentsRepository");
const HashProvider_1 = require("../../../shared/containers/providers/HashProvider/HashProvider");
const AdminsRepository_1 = require("../repositories/AdminsRepository");
const student_1 = require("../../students/schemas/student");
let AuthenticateUserService = class AuthenticateUserService {
    constructor(hashProvider, studentsRepository, adminsRepository) {
        this.hashProvider = hashProvider;
        this.studentsRepository = studentsRepository;
        this.adminsRepository = adminsRepository;
    }
    async execute(email, password, isAdmin = false) {
        try {
            let user = null;
            if (isAdmin) {
                user = await this.adminsRepository.findByEmail(email);
            }
            else {
                user = await this.studentsRepository.findByEmail(email);
            }
            if (!user)
                throw new Error('Invalid email / password combination');
            const passwordMatched = await this.hashProvider.compare(password, user.password);
            if (!passwordMatched)
                throw new Error('Invalid email / password combination');
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, roles: user.roles, isAdmin }, constants_1.JWT_SECRET, {
                expiresIn: '24h'
            });
            return {
                user: student_1.StudentOut.format(user),
                token
            };
        }
        catch (error) {
            throw String(error.message);
        }
    }
};
AuthenticateUserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(HashProvider_1.HashProvider)),
    __param(1, (0, inversify_1.inject)(StudentsRepository_1.StudentsRepository)),
    __param(2, (0, inversify_1.inject)(AdminsRepository_1.AdminsRepository)),
    __metadata("design:paramtypes", [HashProvider_1.HashProvider,
        StudentsRepository_1.StudentsRepository,
        AdminsRepository_1.AdminsRepository])
], AuthenticateUserService);
exports.AuthenticateUserService = AuthenticateUserService;
