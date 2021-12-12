import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = Router();

router.post('/', questionsController.addNewQuestion);
router.get('/:id', questionsController.getQuestion);
router.post('/:id', questionsController.updateQuestion);

export default router;
