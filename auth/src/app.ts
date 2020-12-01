import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { signUpRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(json());

app.use(signUpRouter);

app.use(errorHandler);

export default app;
