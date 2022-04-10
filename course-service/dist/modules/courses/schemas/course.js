"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseOut = void 0;
const student_1 = require("../../students/schemas/student");
class CourseOut {
    static format(course) {
        return {
            id: course.id,
            name: course.name,
            students: course.students.map(student => student_1.StudentOut.format(student))
        };
    }
}
exports.CourseOut = CourseOut;
