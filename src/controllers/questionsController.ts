import { Request, Response, NextFunction } from 'express';
import * as questionsService from '../services/questionsService';

export const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await questionsService.validateAndCreateNewQuestion(req.body);
    return res.status(201).send({ id });
  } catch (err) {
    return err.status
      ? res.status(err.status).send(err.message)
      : next(err);
  }
};

export const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    const question = await questionsService.search(id);
    return res.send(question);
  } catch (err) {
    return err.status
      ? res.status(err.status).send(err.message)
      : next(err);
  }
};

export const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const { answer } = req.body;
  const { user } = res.locals;
  const id = Number(req.params.id);

  try {
    await questionsService.answerQuestion(answer, user, id);
    return res.sendStatus(204);
  } catch (err) {
    return err.status
      ? res.status(err.status).send(err.message)
      : next(err);
  }
};
