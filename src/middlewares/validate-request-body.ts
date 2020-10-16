import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from '@hapi/joi';

function validateRequestBody(
  validator: ObjectSchema
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction): void {
    const { error } = validator.validate(req.body);

    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    next();
  };
}

export default validateRequestBody;
