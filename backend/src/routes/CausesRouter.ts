import express from 'express';
import {createCause,getAllCauses, getSingleCause, updateSingleCause, deleteSingleCause,contributeToCause } from '../controller/CausesController';
import { upload } from '../middleware/cloudinary-multerMiddleware';
const router = express.Router();

router.post('/causes', upload.single('image'), createCause);
router.get('/causes',getAllCauses);
router.get('/cause/:id',getSingleCause);
router.put('/cause/:id',  upload.single('image'),updateSingleCause);
router.delete('/causes/:id',deleteSingleCause);
router.post('/causes/:id/contribute',contributeToCause);







export default router;