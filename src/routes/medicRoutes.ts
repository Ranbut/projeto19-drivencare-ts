import { Router } from "express";
import medicControllers from "../controllers/medicControllers.ts";
import validateSchema from "../middlewares/schemaValidationMiddleware.ts";
import authValidation from "../middlewares/authMiddleware.ts";
import Medic from "../schemas/Medics.ts";

const medicRoutes = Router();

medicRoutes.post('/sign-up', validateSchema(Medic.signUp), medicControllers.signUp)
medicRoutes.post('/login', validateSchema(Medic.login), medicControllers.login)
medicRoutes.get('/name/:name', authValidation, medicControllers.medicsByName)
medicRoutes.get('/specialty/:specialty', authValidation, medicControllers.medicsBySpecialty)
medicRoutes.get('/address/:address', authValidation, medicControllers.medicsByAddress)

export default medicRoutes;