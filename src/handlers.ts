import express from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from './models';
import { UserSchemaYup, UserSchemaJoi } from './schemes';

export const handleValidateWithClassValidator = async (req: express.Request, res: express.Response) => {
  const repo = getRepository(User);
  const user = repo.create(req.body);
  const errors = await validate(user, {
    skipMissingProperties: false, // не проверять отсутствующие свойства
    forbidUnknownValues: true, // запретить неизвестные значения
    stopAtFirstError: true, // проверять до первой ошибки
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  if (errors.length > 0) {
    res.json({ errors });
    return;
  }
  res.json({});
};

export const handleValidateWithYup = async (req: express.Request, res: express.Response) => {
  const { data, error } = await UserSchemaYup.validate(req.body, {
    strict: false, // только валидация, не делать преобразования значений
    abortEarly: true, // проверять до первой ошибки
    stripUnknown: true, // удалить неизвестные свойства из объекта
    recursive: true, // валидировать вложенные схемы (актуально для объектов и массивов)
    context: {}, // любые значения, будут доступны в условной валидации
  })
    .then((data) => ({ data, error: null }))
    .catch((error: Error) => ({ error, data: null }));

  if (error) {
    res.json({ error });
    return;
  }
  res.json({ data });
};

// https://github.com/sideway/joi/blob/master/lib/types/string.js#L688
const messagesJoi = {
  russian: {
    'string.min': '{{#label}} должно быть не менее {{#limit}} символов',
  },
};

export const handleValidateWithJoi = async (req: express.Request, res: express.Response) => {
  // @ts-ignore
  const { value, error } = UserSchemaJoi.validate(req.body, { errors: { language: 'russian' }, messages: messagesJoi });
  if (error) {
    res.json({ error });
    return;
  }
  res.json({ data: value });
};
