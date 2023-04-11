import { db } from "../config/database.js";
import { Medic } from "../protocols.js";

async function newMedic({ name, cpf, address, email, password, specialization }: Medic) {
  return await db.query(
    `
    INSERT INTO medics
        (name, cpf, address, email, password, specialization)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [name, cpf, address, email, password, specialization]
  );
}

async function addAvaliableDate(userId: number, date: string, time: string) {
  return await db.query(
    `
    INSERT INTO "availableDatesTimes"
        ("medicId", date, time)
    VALUES ($1, $2, $3)
    `,
    [userId, date, time]
  );
}

async function findDateTime(date: string, time: string) {
  return await db.query(
    `
    SELECT * FROM "availableDatesTimes" WHERE date=$1 AND time=$2
    `,
    [date, time]
  );
}

async function findByEmail(email: string) {
  return await db.query(
    `
    SELECT * FROM medics WHERE email=$1
    `,
    [email]
  );
}

async function findByCpf(cpf: string) {
  return await db.query(
    `
    SELECT * FROM medics WHERE cpf=$1
    `,
    [cpf]
  );
}

async function findById(id: number) {
  return await db.query(
    `
    SELECT * FROM medics WHERE id=$1
    `,
    [id]
  );
}

async function findByName(name: string) {
  const like = `%${name}%`
  return await db.query(
    `
    SELECT
        id, name, specialization, address
    FROM medics 
    WHERE "name" LIKE $1
    `,
    [like]
  );
}

async function findBySpecialty(specialization: string) {
  return await db.query(
    `
    SELECT 
        id, name, specialization, address 
      FROM medics 
      WHERE specialization=$1
    `,
    [specialization]
  );
}

async function findByAddress(address: string) {
  const like = `%${address}%`
  return await db.query(
    `
    SELECT
        id, name, specialization, address
    FROM medics 
    WHERE address LIKE $1
    `,
    [like]
  );
}

export default {
  newMedic,
  addAvaliableDate,
  findDateTime,
  findByEmail,
  findById,
  findByCpf,
  findByName,
  findBySpecialty,
  findByAddress,
};