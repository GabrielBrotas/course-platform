"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsRepository = void 0;
const inversify_1 = require("inversify");
const prisma_1 = require("../../../shared/services/prisma");
let AdminsRepository = class AdminsRepository {
    async findById(id) {
        return await prisma_1.prisma.admin.findUnique({
            where: {
                id
            }
        });
    }
    async findByEmail(email) {
        return await prisma_1.prisma.admin.findUnique({
            where: {
                email
            }
        });
    }
    async create(data) {
        return await prisma_1.prisma.admin.create({
            data: {
                ...data,
                roles: ['admin']
            }
        });
    }
};
AdminsRepository = __decorate([
    (0, inversify_1.injectable)()
], AdminsRepository);
exports.AdminsRepository = AdminsRepository;
