import { ValidationError } from 'express-validator';
import { BaseCustomError } from './base-custom-error';
import {
  SerializedErrorField,
  SerializedErrorOutput,
} from './types/serialized-error-output';

export type InvalidInputConstructorErrorsParam = ValidationError[];

export default class InvalidInput extends BaseCustomError {
  protected statusCode = 422;

  protected errors: ValidationError[] | undefined;

  private errorMessage = 'The input provided is invalid';

  constructor(errors?: InvalidInputConstructorErrorsParam) {
    super('The input provided is invalid');
    this.errors = errors;

    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): SerializedErrorOutput {
    return this.parseValidationErrors();
  }

  private parseValidationErrors(): SerializedErrorOutput {
    const parsedErrors: SerializedErrorField = {};

    if (this.errors && this.errors.length > 0) {
      this.errors.forEach((error) => {
        if (parsedErrors[error.param]) {
          parsedErrors[error.param].push(error.msg);
        } else {
          parsedErrors[error.param] = [error.msg];
        }
      });
    }

    return {
      errors: [
        {
          message: this.errorMessage,
          fields: parsedErrors,
        },
      ],
    };
  }
}
