import { NextFunction, Request, Response } from "express";
import patientServices from "../services/patientServices.ts";

async function signUp(req: Request, res: Response, next: NextFunction) {
  const userData = req.body;
  try {
    await patientServices.signUp(userData);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const userData = req.body;
  try {
    const token = await patientServices.login(userData);

    return res.send(token);
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
};