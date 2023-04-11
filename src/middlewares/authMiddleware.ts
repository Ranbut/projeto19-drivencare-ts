import errors from "../errors/index.ts";
import patientsRepositories from "../repositories/patientRepositories.ts";
import medicsRepositories from "../repositories/medicRepositories.ts";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default async function authValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) throw errors.unauthorizedError();

    const secret = process.env.SECRET_JWT || 'default_secret';

    jwt.verify(token, secret, async (error, decoded) => {
      try {
        if (error !== null) throw errors.unauthorizedError();
  
        if ((decoded as JwtPayload).type === "patient"){
          const { rows: [user]} = await patientsRepositories.findById((decoded as JwtPayload).id);
          if (!user) throw errors.unauthorizedError();
          res.locals.user = user;
          res.locals.type = "patient";
        }
        else if ((decoded as JwtPayload).type === "medic"){
          const { rows: [user]} = await medicsRepositories.findById((decoded as JwtPayload).id);
          if (!user) throw errors.unauthorizedError();
          res.locals.user = user;
          res.locals.type = "medic";
        }
        
        next();
      } catch (err) {
        next(err);
      }
    });
  }