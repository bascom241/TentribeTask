import express from 'express';
import cors from 'cors';
import CausesRouter from './routes/CausesRouter';
const app = express();

//Configuration 

app.use(cors());
// Avoid Cors Blockage from my UI

app.use(express.json());
// Parse JSON Data

// All routes MiddleWare
app.use('/api',CausesRouter);

export default app;
