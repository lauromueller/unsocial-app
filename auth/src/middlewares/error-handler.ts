import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err) {
    // This will change. We will use this to handle custom errors.
    return res.sendStatus(422);
  }

  return res.sendStatus(500);
};

export default errorHandler;
