import { Router } from "express";
import { getProfessionals } from "../controllers/profiles";

const routes = Router();

routes.get('/get_professionals', getProfessionals)

export default routes;