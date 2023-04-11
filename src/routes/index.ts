import { Router } from "express";
import patientsRoutes from "./patientsRoutes.ts";

const routes = Router();

routes.use("/patients", patientsRoutes);

export default routes;