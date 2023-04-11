import { Router } from "express";
import patientControllers from "../controllers/patientControllers.ts";
import validateSchema from "../middlewares/schemaValidationMiddleware.ts";
import Patient from "../schemas/Patients.js";
import authValidation from "../middlewares/authMiddleware.ts";

const patientRoutes = Router();

patientRoutes.post('/sign-up', validateSchema(Patient.signUp), patientControllers.signUp);
patientRoutes.post('/login', validateSchema(Patient.login), patientControllers.login);
patientRoutes.get('/:id', authValidation, patientControllers.checkAvaliableTime);

export default patientRoutes;