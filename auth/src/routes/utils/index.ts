import { Request, Response } from 'express';

export const handleMethodNotAllowed = (
  req: Request,
  res: Response
): Response => {
  return res.sendStatus(405);
};
