import { Response, NextFunction } from 'express';
import CustomRequest from './requestHelper';
import * as userModel from '../models/userModel';

const userAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const auth = req.headers?.authorization;

  if (!auth) {
    return res.status(401).send('Acess yor account or register a new one!');
  }

  const token = auth.replace('Bearer ', '');
  const isTokenValid = await userModel.checkToken(token);

  if (!isTokenValid) {
    return res.status(401).send('Acess yor account or register a new one!');
  }

  req.token = token;

  return next();
};

export default userAuth;
