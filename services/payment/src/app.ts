import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './config/db';
import config from './config/configSetup';
import routes from './routes/routes';
import isAuthorized from './middleware/authorize'


const app = express();

app.use(express.json());

app.use(cors({ origin: true }));


app.get('/pay-api', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world! This is the payment service' });
});

app.all('*', isAuthorized);
app.use('/pay-api/', routes);

db.sync({ alter: true }).then(() => {
    app.listen(
        config.PORT || 5001,
        config.HOST || '0.0.0.0',
        () => console.log(`Server is running on http://${config.HOST}:${config.PORT}`));
})
    .catch((err: any) => console.error('Error connecting to the database', err));

export default app;
