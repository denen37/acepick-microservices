import express, { Request, Response } from 'express';
const routes = express.Router();
import { TestEvent, getProfessions } from '../controllers/job';

routes.get('/test', TestEvent)
routes.get('/get-all-profs-by-sector', getProfessions)

export default routes;