import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models';
import { InvalidInput, DuplicatedEmail } from '../errors';
import { UserSignedUp } from '../events';

export const SIGNUP_ROUTE = '/api/auth/signup';

const signUpRouter = express.Router();

signUpRouter.post(
  SIGNUP_ROUTE,
  [
    body('email')
      .isEmail()
      .withMessage('Email must be in a valid format')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage('Password must be between 8 and 32 characters'),
    body('password')
      .matches(/^(.*[a-z].*)$/)
      .withMessage('Password must contain at least one lowercase letter'),
    body('password')
      .matches(/^(.*[A-Z].*)$/)
      .withMessage('Password must contain at least one uppercase letter'),
    body('password')
      .matches(/^(.*\d.*)$/)
      .withMessage('Password must contain at least one digit'),
    body('password').escape(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();

    if (/.+@[A-Z]/g.test(req.body.email)) {
      errors.push({
        location: 'body',
        value: req.body.email,
        param: 'email',
        msg: 'Email is not normalized',
      });
    }

    if (/[><'"/]/g.test(req.body.password)) {
      errors.push({
        location: 'body',
        value: req.body.password,
        param: 'password',
        msg: 'Password contains invalid characters',
      });
    }

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const { email, password } = req.body;

    try {
      const newUser = await User.create({ email, password });
      const userSignedUp = new UserSignedUp(newUser);

      return res
        .status(userSignedUp.getStatusCode())
        .send(userSignedUp.serializeRest());
    } catch (e) {
      throw new DuplicatedEmail();
    }
  }
);

export default signUpRouter;
