export type IStudent = {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: string[];
}

export type IStudentOut = {
    id: number;
    name: string;
    email: string;
}

export class StudentOut {
    static format(student: IStudent): IStudentOut {
        return {
            id: student.id,
            name: student.name,
            email: student.email,
        }
    }
}
