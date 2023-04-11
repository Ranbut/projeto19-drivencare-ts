import { NextFunction, Request, Response } from "express";
import medicServices from "../services/medicServices.ts";

async function signUp(req: Request, res: Response, next: NextFunction) {
  const userData = req.body;
  try {
    await medicServices.signUp(userData);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const userData = req.body;
  try {
    const token = await medicServices.login(userData);

    return res.send(token);
  } catch (err) {
    next(err);
  }
}

async function medicsByName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsByName(name);

    return res.send(medics);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function medicsBySpecialty(req: Request, res: Response, next: NextFunction) {
  const { specialty } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsBySpecialty(specialty);

    return res.send(medics);
  } catch (err) {
    next(err);
  }
}

async function medicsByAddress(req: Request, res: Response, next: NextFunction) {
  const { address } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsByAddress(address);

    return res.send(medics);
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
  medicsByName,
  medicsBySpecialty,
  medicsByAddress
};