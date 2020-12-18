import { SerializedErrorOutput } from './types/serialized-error-output';

export default abstract class BaseCustomError extends Error {
  protected constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getStatusCode(): number;

  abstract serializeErrorOutput(): SerializedErrorOutput;
}
