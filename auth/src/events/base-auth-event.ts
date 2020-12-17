export abstract class BaseAuthEvent<TRest = unknown> {
  abstract getStatusCode(): number;

  abstract serializeRest(): TRest;
}
