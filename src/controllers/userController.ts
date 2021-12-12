import { Request, Response, NextFunction } from 'express';
import registerUser from '../services/userService';
import errorStatus from './errorStatusHelper';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await registerUser(req.body);
    return res.status(201).send({ token });
  } catch (err) {
    const status = errorStatus(err.name);
    return status
      ? res.status(status).send(err.message)
      : next(err);
  }
};

export default create;
