import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const getUserByIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});
