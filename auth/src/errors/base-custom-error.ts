export abstract class BaseCustomError extends Error {
  abstract statusCode: number;

  protected constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getStatusCode(): number;

  abstract serializeErrorOutput(): unknown;
}
