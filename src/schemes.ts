import * as yup from 'yup';
import Joi from 'joi';
import { UserRole } from './types';

import yupLocaleRu from './yupLocaleRu';
yup.setLocale(yupLocaleRu);

const UserSchemaYupBase = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
});

export const UserSchemaYup = UserSchemaYupBase.concat(
  yup.object().shape({
    role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)).required(),
    isActive: yup.boolean().required(),
    rating: yup.number().min(0).max(10).required(),
  }),
);

const UserSchemaJoiBase = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
});

export const UserSchemaJoi = UserSchemaJoiBase.concat(
  Joi.object({
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .required(),
    isActive: Joi.boolean().required(),
    rating: Joi.number().min(0).max(10).required(),
  }),
);
