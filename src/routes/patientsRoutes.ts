import { Router } from "express";
import patientControllers from "../controllers/patientControllers.ts";
import validateSchema from "../middlewares/schemaValidationMiddleware.ts";
import Patient from "../schemas/Patients.js";

const patientRoutes = Router();

patientRoutes.post('/sign-up', validateSchema(Patient.signUp), patientControllers.signUp)
patientRoutes.post('/login', validateSchema(Patient.login), patientControllers.login)

export default patientRoutes;