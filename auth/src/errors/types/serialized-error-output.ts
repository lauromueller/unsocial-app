export type SerializedErrorField = {
  [key: string]: string[];
};

export type SerializedError = {
  message: string;
  fields?: SerializedErrorField;
};

export type SerializedErrorOutput = {
  errors: SerializedError[];
};
