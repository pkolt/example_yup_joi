import express from 'express';
import { handleValidateWithClassValidator, handleValidateWithYup, handleValidateWithJoi } from './handlers';

export const appRoutes = (app: express.Application) => {
  app.post('/api/validate/class-validator', handleValidateWithClassValidator);
  app.post('/api/validate/yup', handleValidateWithYup);
  app.post('/api/validate/joi', handleValidateWithJoi);
};
