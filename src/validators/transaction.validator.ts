import Joi from 'joi';

export const fundWalletSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

export const transferFundsSchema = Joi.object({
  receiverId: Joi.number().integer().required(),
  amount: Joi.number().positive().required(),
});


export const withdrawFromWalletSchema = Joi.object({
  amount: Joi.number().positive().required(),
});
