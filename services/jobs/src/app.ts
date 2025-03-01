import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './models/index';
import config from './config/configSetup';

const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.get('/jobs', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world! This is the jobs service' });
});


db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
})
    .catch(err => console.error('Error connecting to the database', err));

export default app;
