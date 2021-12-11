import { Request, Response, NextFunction } from 'express';
import InvalidBodyError from '../errors/InvalidBodyError';
import * as questionsService from '../services/questionsService';

export const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await questionsService.validateAndCreateNewQuestion(req.body);
    return res.status(201).send({ id });
  } catch (err) {
    if (err instanceof InvalidBodyError) {
      return res.status(400).send(err.message);
    }
    return next(err);
  }
};

export const test = '';
