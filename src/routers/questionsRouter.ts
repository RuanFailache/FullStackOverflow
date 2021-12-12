import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';
import userAuth from '../middlewares/userAuth';

const router = Router();

router.post('/', questionsController.addNewQuestion);
router.get('/:id', questionsController.getQuestion);
router.post('/:id', userAuth, questionsController.updateQuestion);

export default router;
