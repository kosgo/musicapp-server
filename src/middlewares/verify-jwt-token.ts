import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { environments } from '../config';

function verifyJwtToken(req: Request, res: Response, next: NextFunction): void {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).send({ message: 'Access denied!' });
    return;
  }

  try {
    const token = bearerToken.split(' ')[1];
    req.body._decoded = jwt.verify(token, environments.JWT_SECRET);

    next();
  } catch (error) {
    console.error(error);

    res.status(400).send({ message: 'Invalid token' });
  }
}

export default verifyJwtToken;
