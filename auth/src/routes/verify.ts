import express, { Request, Response } from 'express';
import { VERIFY_ROUTE } from './route-defs';

const verifyRouter = express.Router();

verifyRouter.post(VERIFY_ROUTE, [], (req: Request, res: Response) => {
  res.sendStatus(422);
});

export default verifyRouter;
