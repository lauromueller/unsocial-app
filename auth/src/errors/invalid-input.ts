import { BaseCustomError } from './base-custom-error';

export class InvalidInput extends BaseCustomError {
  statusCode = 422;

  serializedErrorOutput = undefined;

  constructor() {
    super('user input does not match validation criteria');

    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): unknown {
    return this.serializedErrorOutput;
  }
}
