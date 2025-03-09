import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './config/db'
import config from './config/configSetup';
import jobRoutes from './routes/jobs'
import serviceRoutes from './routes/services'
import { suscribe } from './events/suscribe';


const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.get('/jobs/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world! This is the jobs service' });
});

app.use('/jobs', jobRoutes);
app.use('/jobs/services', serviceRoutes)

suscribe().then(() => {
    console.log('Event listener is running');
});

db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
})
    .catch((err: any) => console.error('Error connecting to the database', err));

export default app;
