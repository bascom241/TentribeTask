import express from 'express';
import {createCause} from '../controller/CausesController';

const router = express.Router();

router.post('/causes',createCause);


export default router;