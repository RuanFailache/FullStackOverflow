import { Request, Response, NextFunction } from 'express';
import * as questionsService from '../services/questionsService';

export const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await questionsService.validateAndCreateNewQuestion(req.body);
    res.status(201).send({ id });
  } catch (err) {
    if (err.name === 'InvalidBodyError') {
      res.sendStatus(400);
      return;
    }
    next(err);
  }
};

export const test = '';
