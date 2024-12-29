import express from 'express';
import { 
    uploadSummary, 
    searchSummaries 
} from '../controllers/summary.controller.js';

const router = express.Router();

router.post('/upload/:id', uploadSummary);
router.get('/search/:id', searchSummaries);

export default router;
