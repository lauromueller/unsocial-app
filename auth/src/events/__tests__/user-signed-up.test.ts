import { User } from '../../models';
import UserSignedUp from '../user-signed-up';

it('should expose only the id and the email when serializing to REST', async () => {
  const newUser = await User.create({
    email: 'test@test.com',
    password: 'Valid123',
  });
  const userSignedUpEvent = new UserSignedUp(newUser);
  const serializedResponse = userSignedUpEvent.serializeRest();

  expect(Object.keys(serializedResponse).sort()).toEqual(
    ['id', 'email'].sort()
  );
  expect(serializedResponse.email).toEqual('test@test.com');
  expect(userSignedUpEvent.getStatusCode()).toEqual(201);
});
