import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { VERIFY_ROUTE } from './route-defs';
import { AccountVerification, User } from '../models';
import { UserVerified } from '../events';

const verifyRouter = express.Router();

verifyRouter.post(
  VERIFY_ROUTE,
  [body('emailVerificationToken').trim().isLength({ min: 64, max: 64 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
      throw new Error('Email verification token is invalid.');
    }

    const { emailVerificationToken } = req.body;

    const verificationDoc = await AccountVerification.findOne({
      emailVerificationToken,
    });

    if (!verificationDoc) {
      throw new Error('Email verification token was not found.');
    }

    const user = await User.findOneAndUpdate(
      {
        _id: verificationDoc.userId,
      },
      {
        isVerified: true,
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new Error(
        'User with the corresponding verification token was not found.'
      );
    }

    const userVerified = new UserVerified(user);

    return res.sendStatus(userVerified.getStatusCode());
  }
);

export default verifyRouter;
