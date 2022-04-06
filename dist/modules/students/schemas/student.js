"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentOut = void 0;
class StudentOut {
    static format(student) {
        return {
            id: student.id,
            name: student.name,
            email: student.email,
        };
    }
}
exports.StudentOut = StudentOut;
