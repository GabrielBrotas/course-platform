import { NextFunction, Response, Request } from "express";
import { JWT_SECRET } from "@src/config/constants";
import jwt from 'jsonwebtoken'

interface ITokenPayload {
  id: number,
  email: string,
  roles: string[],
}

export default function ensureAuth(request: Request, response: Response, next: NextFunction) {
  try {
    const jwtToken = request.headers.authorization;

    if (!jwtToken) throw 'JWT token is missing';

    const [, token] = jwtToken.split('Bearer ');

    const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;

    request.user = {
      id: decoded.id,
      email: decoded.email,
      roles: decoded.roles,
    };

    return next();
} catch (err) {
    return response.status(403).send(err)
}
}
