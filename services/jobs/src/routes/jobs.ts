import express, { Request, Response } from 'express';
const routes = express.Router();
import { testApi, getJobs, getJobById, createJobOrder, respondToJob, generateInvoice, payforJob, completeJob, approveJob, disputeJob } from '../controllers/job';
import { getProfByIdList, getProfIds } from '../controllers/services';
import { createSector, deleteSector, getSectors, getSectorsById, updateSector } from '../controllers/sector';
import { createProfession, deleteProfession, getProfessionById, getProfessions, updateProfession } from '../controllers/profession';
import { allowRoles } from '../middlewares/allowRoles';
import { UserRole } from '../models/Enum';

routes.get('/test', testApi)

routes.get('/sectors', getSectors);
routes.get('/sectors/:id', getSectorsById);
routes.post('/sectors', createSector);
routes.put('/sectors/:id', updateSector);
routes.delete('/sectors/:id', deleteSector);

routes.get('/profs', getProfessions);
routes.get('/profs/:id', getProfessionById);
routes.post('/profs', createProfession);
routes.put('/profs/:id', updateProfession);
routes.delete('/profs/:id', deleteProfession);

routes.get('/jobs', allowRoles(UserRole.CLIENT, UserRole.PROFFESSIONAL), getJobs);
routes.get('/jobs/:id', allowRoles('*'), getJobById);
routes.post('/jobs', allowRoles(UserRole.CLIENT), createJobOrder);
routes.put('/jobs/response/:jobId', allowRoles(UserRole.PROFFESSIONAL), respondToJob);
routes.post('/jobs/invoice', allowRoles(UserRole.PROFFESSIONAL), generateInvoice);
routes.post('/jobs/payment/:jobId', allowRoles(UserRole.CLIENT), payforJob);
routes.post('/jobs/complete/:jobId', allowRoles(UserRole.PROFFESSIONAL), completeJob);
routes.post('/jobs/approve/:jobId', allowRoles(UserRole.CLIENT), approveJob);
routes.post('/jobs/dispute/:jobId', allowRoles(UserRole.CLIENT), disputeJob);

routes.get('/search_profs', getProfIds)
routes.post('/get_profs', getProfByIdList)

export default routes;