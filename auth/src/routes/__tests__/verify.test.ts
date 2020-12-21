import request from 'supertest';
import app from '../../app';
import { VERIFY_ROUTE } from '../route-defs';

describe('tests the email verification route', () => {
  it('should return a 422 if the provided email verification token is invalid', async () => {
    await request(app)
      .post(VERIFY_ROUTE)
      .send({ emailVerificationToken: 'something' })
      .expect(422);
  });
});
