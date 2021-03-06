// nesse type, vamos sobrescrever a tipagem do Express para adicionar o user no request
declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: number;
      email: string;
      roles: string[];
      isAdmin: boolean;
    };
  }
}
