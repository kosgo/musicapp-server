import Joi, { ObjectSchema } from '@hapi/joi';

export const signUpValidator: ObjectSchema = Joi.object({
  email: Joi.string().email().required().max(255),
  password: Joi.string().required().min(7).max(255),
  firstName: Joi.string().required().min(2).max(255),
  lastName: Joi.string().required().min(2).max(255),
});

export const signInValidator: ObjectSchema = Joi.object({
  email: Joi.string().email().required().max(255),
  password: Joi.string().required().min(7).max(255),
});
