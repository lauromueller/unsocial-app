import { User } from '../index';
import { BaseCustomError } from '../../errors/base-custom-error';
import DuplicatedEmail from '../../errors/duplicated-email';

it('should not save a new user if the email is already in the database', async () => {
  const userInfo = {
    email: 'test@test.com',
    password: 'Valid123',
  };

  const newUser1 = await User.create(userInfo);
  expect(newUser1).toBeDefined();
  expect(newUser1.email).toEqual(userInfo.email);

  let err: DuplicatedEmail | undefined;

  try {
    await User.create(userInfo);
  } catch (e) {
    err = e;
  }

  const serializedErrorOutput = err ? err.serializeErrorOutput() : undefined;

  expect(err).toBeDefined();
  expect(err).toBeInstanceOf(BaseCustomError);
  expect(serializedErrorOutput).toBeDefined();
  expect(serializedErrorOutput?.errors[0].message).toEqual(
    'The email is already in the database'
  );
});
