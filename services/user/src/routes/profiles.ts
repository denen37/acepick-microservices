import { Router } from "express";
import { getProfessionals, getCooperates } from "../controllers/profiles";

const routes = Router();

routes.get('/get_professionals', getProfessionals)
routes.get('/get_corporates', getCooperates)

export default routes;