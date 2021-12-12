/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ServerError from '../errors/ServerError';

const errorMiddleware = (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const message = 'We had an internal error! Please contact us.';
  console.log(err);
  return res.status(500).send(message);
};

export default errorMiddleware;
