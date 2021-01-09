import request from 'supertest';
import app from '../../app';
import { SIGNUP_ROUTE, VERIFY_ROUTE } from '../route-defs';
import { EmailSender } from '../../utils';
import { MockEmailApi } from '../../test-utils/mock-email-api';
import { AccountVerification, User } from '../../models';
import { generateEmailVerificationToken } from '../../utils/account-verification';

beforeEach(() => {
  const emailSender = EmailSender.getInstance();

  emailSender.activate();
  emailSender.setEmailApi(new MockEmailApi());
});

describe('tests the email verification route', () => {
  const validUserInfo = {
    email: 'test@test.com',
    password: 'Valid123',
  };

  it('should return a 500 if the provided email verification token is invalid', async () => {
    const response = await request(app)
      .post(VERIFY_ROUTE)
      .send({ emailVerificationToken: 'something' })
      .expect(500);

    expect(response.body).toStrictEqual({});
  });

  it('should return a 500 if the provided email verification token is not found', async () => {
    const response = await request(app)
      .post(VERIFY_ROUTE)
      .send({ emailVerificationToken: generateEmailVerificationToken() })
      .expect(500);

    expect(response.body).toStrictEqual({});
  });

  it('should mark the user as verified upon matching verification token', async () => {
    const signUpResponse = await request(app)
      .post(SIGNUP_ROUTE)
      .send(validUserInfo);

    let user = await User.findOne({ email: signUpResponse.body.email });

    const verificationToken = await AccountVerification.findOne({
      userId: user!._id,
    });

    expect(verificationToken).not.toBe(null);

    await request(app).post(VERIFY_ROUTE).send({
      emailVerificationToken: verificationToken!.emailVerificationToken,
    });

    user = await User.findOne({ email: signUpResponse.body.email });

    expect(user!.isVerified).toEqual(true);
  });

  it('should send a 200 and successful verification status upon successful verification', async () => {
    const signUpResponse = await request(app)
      .post(SIGNUP_ROUTE)
      .send(validUserInfo);

    const user = await User.findOne({ email: signUpResponse.body.email });

    const verificationToken = await AccountVerification.findOne({
      userId: user!._id,
    });

    expect(verificationToken).not.toBe(null);

    const response = await request(app)
      .post(VERIFY_ROUTE)
      .send({
        emailVerificationToken: verificationToken!.emailVerificationToken,
      })
      .expect(200);

    expect(response.body).toStrictEqual({});
  });
});
