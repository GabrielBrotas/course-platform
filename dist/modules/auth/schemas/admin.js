"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOut = void 0;
class AdminOut {
    static format(student) {
        return {
            id: student.id,
            name: student.name,
            email: student.email
        };
    }
}
exports.AdminOut = AdminOut;
