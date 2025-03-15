import { Router } from "express";
import { getProfessionals, getCooperates, ProfAccountInfo } from "../controllers/profiles";

const routes = Router();

routes.get('/get_professionals', getProfessionals)
routes.get('/get_corporates', getCooperates)
routes.get('/me', ProfAccountInfo);

export default routes;