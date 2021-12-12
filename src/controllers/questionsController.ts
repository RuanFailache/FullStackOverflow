import { Request, Response, NextFunction } from 'express';
import * as questionsService from '../services/questionsService';
import errorStatus from './errorStatusHelper';

export const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await questionsService.validateAndCreateNewQuestion(req.body);
    return res.status(201).send({ id });
  } catch (err) {
    const status = errorStatus(err.name);
    return status
      ? res.status(status).send(err.message)
      : next(err);
  }
};

export const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    const question = await questionsService.search(id);
    return res.send(question);
  } catch (err) {
    const status = errorStatus(err.name);
    return status
      ? res.status(status).send(err.message)
      : next(err);
  }
};
