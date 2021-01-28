import 'reflect-metadata';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { NodeEnv } from './types';
import { appRoutes } from './routes';
import { Connection, createConnection } from 'typeorm';

declare global {
  namespace Express {
    interface Application {
      dbconn: Connection;
    }
  }
}

const nodeEnv = process.env.NODE_ENV ?? NodeEnv.DEVELOPMENT;
const dotEnvPath = path.resolve(`.env.${nodeEnv}`);
dotenv.config({ path: dotEnvPath });

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

export const createApp = async () => {
  const app = express();
  const appEnv = app.get('env');
  const isDevelopment = appEnv === NodeEnv.DEVELOPMENT;
  const isProduction = appEnv === NodeEnv.PRODUCTION;

  app.set('case sensitive routing', true);
  app.set('strict routing', true);

  app.dbconn = await createConnection();

  process.on('exit', () => {
    app.dbconn.close();
  });

  if (isDevelopment) {
    app.use(morgan('dev'));
  }

  if (isProduction) {
    app.set('trust proxy', 'loopback');
  }

  app.use(bodyParser.json());
  appRoutes(app);
  return app;
};

const runServer = async () => {
  const app = await createApp();
  app.listen(SERVER_PORT, () => {
    console.log(`Start Express app http://${SERVER_HOST}:${SERVER_PORT}`);
  });
};

if (!module.parent) {
  runServer().catch(console.error);
}
