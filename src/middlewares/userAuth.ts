import { Request, Response, NextFunction } from 'express';
import * as userModel from '../models/userModel';

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('Acess yor account or register a new one!');
  }

  const token = authorization.replace('Bearer ', '');
  const user = await userModel.checkToken(token);

  if (!user) {
    return res.status(401).send('Acess yor account or register a new one!');
  }

  res.locals.user = user;

  return next();
};

export default userAuth;
