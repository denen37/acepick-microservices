import express, { Request, Response } from 'express';
const routes = express.Router();
import { testApi, getProfessions, getSectors, getSectorsById, getProfessionById, getJobs } from '../controllers/job';
import { getProfByIdList, getProfIds } from '../controllers/services';

routes.get('/test', testApi)

routes.get('/sectors', getSectors)
routes.get('/sectors/:id', getSectorsById)

routes.get('/profs', getProfessions)
routes.get('/profs/:id', getProfessionById)
routes.get('/myjobs', getJobs) //query = {status, }

routes.get('/search_profs', getProfIds)
routes.post('/get_profs', getProfByIdList)

export default routes;