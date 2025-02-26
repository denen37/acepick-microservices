import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from "path";
import db from './models/index';
import config from './config/configSetup';
import cors from 'cors';
import { isAuthorized } from './middlewares/authorize';
import index from './routes/index';
import auth from './routes/auth';

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.all('*', isAuthorized);
app.use("/api", index);
app.use("/api", auth);


db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
})
    .catch(err => console.error('Error connecting to the database', err));
