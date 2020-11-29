import express from 'express';
import { json } from 'body-parser';
import { signUpRouter } from './routes';

const app = express();

app.use(json());

app.use(signUpRouter);

export default app;
