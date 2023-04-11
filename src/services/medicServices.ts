import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import errors from "../errors/index.js";
import userRepositories from "../repositories/medicRepositories.ts";
import { Medic } from "../protocols.ts";

async function signUp({ name, cpf, email, password, address, specialization} : Medic) {

  const { rowCount : countEmail } = await userRepositories.findByEmail(email);
    if (countEmail) throw errors.duplicatedEmailError(email);
  
  const { rowCount : countCpf } = await userRepositories.findByCpf(cpf);
  if (countCpf) throw errors.duplicatedEmailError(cpf);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.newMedic({ name, cpf, email, password: hashPassword, address, specialization });
}

async function login({ email, password } : Medic) {
  const { rowCount, rows: [user] } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const secret = process.env.SECRET_JWT || 'default_secret';

  const token = jwt.sign({ id: user.id, type: "medic"}, secret, { expiresIn: 86400 });

  return token;
}

async function addAvaliableDate(userId: number, date: string, time: string) {
  const { rowCount } = await userRepositories.findDateTime(date, time);
  if (rowCount) throw errors.duplicatedDateTimeAvaliable();
  
  await userRepositories.addAvaliableDate(userId, date, time);
}

async function medicsByName(name: string) {
  console.log(name)
  const result = await userRepositories.findByName(name);

  return result;
}

async function medicsBySpecialty(specialty : string) {
  const result = await userRepositories.findBySpecialty(specialty);

  return result;
}

async function medicsByAddress(address : string) {
  const typeLikeInput = `%${address}%`;
  const result = await userRepositories.findByAddress(typeLikeInput);

  return result;
}

export default {
  signUp,
  login,
  addAvaliableDate,
  medicsByName,
  medicsBySpecialty,
  medicsByAddress,
};