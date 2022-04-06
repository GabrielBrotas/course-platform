import { IStudent, IStudentOut, StudentOut } from "../../students/schemas/student";

export type ICourse = {
  id: number;
  name: string;

  students: IStudent[]
}

export type ICourseOut = {
  id: number;
  name: string;

  students: IStudentOut[]
}

export class CourseOut {
  static format(course: ICourse): ICourseOut {
    return {
      id: course.id,
      name: course.name,
      students: course.students.map(student => StudentOut.format(student))
    }
  }
}
