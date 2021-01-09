import { BaseAuthEvent } from './base-auth-event';
import { UserDocument } from '../models';

export type UserVerifiedRestPayload = {
  id: string;
  verificationStatus: string;
};

export default class UserVerified extends BaseAuthEvent<UserVerifiedRestPayload> {
  private user: UserDocument;

  private statusCode = 200;

  constructor(user: UserDocument) {
    super();
    this.user = user;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): UserVerifiedRestPayload {
    return {
      id: this.user._id,
      verificationStatus: 'success',
    };
  }
}
