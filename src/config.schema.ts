import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  NEWS_API_KEY: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(27017).required(),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().allow('').optional(),
  DB_PASSWORD: Joi.string().allow('').optional(),
});
