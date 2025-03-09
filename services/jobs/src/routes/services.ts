import { Router } from "express";
import { getProfByIdList, getProfIds } from "../controllers/services";

const routes = Router();

routes.get('/search_profs', getProfIds)
routes.post('/get_profs', getProfByIdList)

export default routes;