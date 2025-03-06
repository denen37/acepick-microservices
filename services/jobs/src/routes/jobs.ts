import express from 'express';
const routes = express.Router();
import { TestEvent } from '../controllers/job';

routes.get('/test', TestEvent)

export default routes;