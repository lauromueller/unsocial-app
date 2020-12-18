import { randomBytes } from 'crypto';

export function generateEmailVerificationToken(): string {
  return randomBytes(32).toString('hex');
}
