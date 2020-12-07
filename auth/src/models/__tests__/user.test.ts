import { randomBytes } from 'crypto';
import { User } from '../index';
import { BaseCustomError, DuplicatedEmail } from '../../errors';
import { PasswordHash } from '../../utils';

describe('tests the User mongoose model', () => {
  const userInfo = {
    email: 'test@test.com',
    password: 'Valid123',
  };

  it('should not save a new user if the email is already in the database', async () => {
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

  it('should encrypt the password when creating the user', async () => {
    const newUser = await User.create(userInfo);
    expect(newUser.password).not.toEqual(userInfo.password);
    expect(newUser.password.split('.')).toHaveLength(2);
    expect(newUser.password.split('.')[1].length).toEqual(
      randomBytes(16).toString('hex').length
    );
  });

  it('should return true when comparing the hashedPassword with its original providedPassword', async () => {
    const newUser = await User.create(userInfo);

    expect(
      PasswordHash.compareSync({
        providedPassword: '1234',
        storedPassword: newUser.password,
      })
    ).toEqual(false);
    expect(
      PasswordHash.compareSync({
        providedPassword: userInfo.password,
        storedPassword: newUser.password,
      })
    ).toEqual(true);
  });
});
