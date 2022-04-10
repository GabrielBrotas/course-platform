export type IAdmin = {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: string[];
}

export type IAdminOut = {
  id: number;
  name: string;
  email: string;
}

export class AdminOut {
  static format(student: IAdmin): IAdminOut {
      return {
          id: student.id,
          name: student.name,
          email: student.email
      }
  }
}
