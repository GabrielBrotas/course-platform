"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
const constants_1 = __importDefault(require("../../config/constants"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureAuth = (roles = []) => {
    return (request, response, next) => {
        try {
            const jwtToken = request.headers.authorization;
            if (!jwtToken)
                throw 'JWT token is missing';
            const [, token] = jwtToken.split('Bearer ');
            const decoded = jsonwebtoken_1.default.verify(token, constants_1.default.JWT_SECRET);
            if (roles.length > 0 &&
                !decoded.roles.some(role => roles.includes(role)))
                throw `User does not have ${roles.join(', ')} permission`;
            request.user = {
                id: decoded.id,
                email: decoded.email,
                roles: decoded.roles,
                isAdmin: decoded.isAdmin,
            };
            return next();
        }
        catch (err) {
            return response.status(403).send(err);
        }
    };
};
exports.ensureAuth = ensureAuth;
