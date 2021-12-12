import { Request, Response, NextFunction } from 'express';
import registerUser from '../services/userService';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await registerUser(req.body);
    return res.status(201).send({ token });
  } catch (err) {
    return err.status
      ? res.status(err.status).send(err.message)
      : next(err);
  }
};

export default create;
