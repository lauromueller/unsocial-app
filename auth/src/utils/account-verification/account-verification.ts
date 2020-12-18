import { randomBytes } from 'crypto';

export function generateAccountVerificationToken(): string {
  return randomBytes(32).toString('hex');
}
