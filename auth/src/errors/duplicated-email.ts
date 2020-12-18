import BaseCustomError from './base-custom-error';
import { SerializedErrorOutput } from './types/serialized-error-output';

// TODO: rethink naming
export default class DuplicatedEmail extends BaseCustomError {
  private statusCode = 422;

  private defaultErrorMessage = 'The email is already in the database';

  constructor() {
    super('The email is already in the database');

    Object.setPrototypeOf(this, DuplicatedEmail.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): SerializedErrorOutput {
    return {
      errors: [
        {
          message: this.defaultErrorMessage,
        },
      ],
    };
  }
}
