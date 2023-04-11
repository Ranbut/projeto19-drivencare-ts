import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import errors from "../errors/index.ts";
import patientsRepositories from "../repositories/patientRepositories.ts";
import { Patient } from "../protocols.ts";
import medicRepositories from "../repositories/medicRepositories.ts";

async function signUp({ name, cpf, email, password } : Patient) {

  const { rowCount : countEmail } = await patientsRepositories.findByEmail(email);
  if (countEmail) throw errors.duplicatedEmailError(email);

  const { rowCount : countCpf } = await patientsRepositories.findByCpf(cpf);
  if (countCpf) throw errors.duplicatedEmailError(cpf);

  const hashPassword = await bcrypt.hash(password, 10);
  await patientsRepositories.newPatient({ name, cpf, email, password: hashPassword });
}

async function login({ email, password } : Patient) {

  const { rowCount, rows: [user] } = await patientsRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw errors.invalidCredentialsError();

  const secret = process.env.SECRET_JWT || 'default_secret';

  const token = jwt.sign({ id: user.id, type: "patient" }, secret, { expiresIn: 86400 });

  return token;
}

async function checkAvaliableTime(medicId: number) {

  const { rowCount } = await medicRepositories.findById(medicId);
  if (!rowCount) throw errors.medicNotFound();

  const result = patientsRepositories.checkAvaliableTime(medicId);

  return result;
}

export default {
  signUp,
  login,
  checkAvaliableTime
};