import { BaseAuthEvent } from './base-auth-event';
import { UserDocument } from '../models';

export type UserSignedUpRestPayload = {
  id: string;
  email: string;
};

export default class UserSignedUp extends BaseAuthEvent<UserSignedUpRestPayload> {
  private user: UserDocument;

  private statusCode = 201;

  constructor(user: UserDocument) {
    super();
    this.user = user;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): UserSignedUpRestPayload {
    return {
      id: this.user._id,
      email: this.user.email,
    };
  }
}
