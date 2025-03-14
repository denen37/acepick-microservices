import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './config/db';
import config from './config/configSetup';
import jobRoutes from './routes/jobs';
import isAuthorized from './middlewares/authorize'


const app = express();

app.use(express.json());

app.use(cors({ origin: true }));


app.get('/jobs/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world! This is the jobs service' });
});

app.all('*', isAuthorized);
app.use('/api/jobs', jobRoutes);

db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
})
    .catch((err: any) => console.error('Error connecting to the database', err));

export default app;
