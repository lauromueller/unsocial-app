import { DuplicatedEmail } from '../index';

it('should have a status code of 422', () => {
  const duplicatedEmailError = new DuplicatedEmail();
  expect(duplicatedEmailError.getStatusCode()).toEqual(422);
});

it('should return the errors in the serialized format', () => {
  const duplicatedEmailError = new DuplicatedEmail();
  const serializedErrorOutput = duplicatedEmailError.serializeErrorOutput();

  expect(serializedErrorOutput.errors).toHaveLength(1);
  expect(serializedErrorOutput.errors[0].message).toEqual(
    'The email is already in the database'
  );
});
