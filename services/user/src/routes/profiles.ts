import { Router } from "express";
import { getProfessionals, getCooperates, ProfAccountInfo } from "../controllers/profiles";
import { updateProfile } from "../controllers/profiles"

const routes = Router();

routes.post('/get_professionals', getProfessionals)
routes.get('/get_corporates', getCooperates)
routes.get('/me', ProfAccountInfo);
routes.post('/update', updateProfile);

export default routes;