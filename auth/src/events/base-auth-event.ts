export abstract class BaseAuthEvent<TRest = unknown> {
  protected abstract statusCode: number;

  abstract getStatusCode(): number;

  abstract serializeRest(): TRest;
}
