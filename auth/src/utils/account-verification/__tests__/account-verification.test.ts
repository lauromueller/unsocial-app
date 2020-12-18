import { generateAccountVerificationToken } from '../index';

describe('tests the token generation function', () => {
  it('should produce a string of length 64', () => {
    expect(generateAccountVerificationToken()).toHaveLength(64);
  });
});
