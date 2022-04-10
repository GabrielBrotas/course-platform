import { NextFunction, Response, Request } from "express";
import constants from "@src/config/constants";
import jwt from 'jsonwebtoken'

interface ITokenPayload {
  id: number,
  email: string,
  roles: string[],
  isAdmin: boolean
}


export const ensureAuth = (roles: string[] = []) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const jwtToken = request.headers.authorization;

      if (!jwtToken) throw 'JWT token is missing';

      const [, token] = jwtToken.split('Bearer ');

      const decoded = jwt.verify(token, constants.JWT_SECRET) as ITokenPayload;

      if(
        roles.length > 0 && 
        !decoded.roles.some(role => roles.includes(role))
      ) throw `User does not have ${roles.join(', ')} permission`
      
      request.user = {
        id: decoded.id,
        email: decoded.email,
        roles: decoded.roles,
        isAdmin: decoded.isAdmin,
      };

      return next();
    } catch (err) {
        return response.status(403).send(err)
    }
} 

}
