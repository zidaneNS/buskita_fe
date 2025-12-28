export interface DefaultResponse<T> {
  statusCode: number;
  message: string;
  payloads?: T
}