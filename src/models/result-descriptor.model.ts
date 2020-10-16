export enum ResultStatus {
  SUCCESS,
  ERROR,
  RESOURCE_NOT_FOUND,
}

export interface ResultDescriptor<P = unknown> {
  message: string;
  status: ResultStatus;
  payload?: P;
}
