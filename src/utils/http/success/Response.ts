import { APIGatewayProxyResult } from "aws-lambda";

interface IResponse {
  statusCode?: number;
  headers?: { [header: string]: string | number | boolean } | undefined;
  body: any;
}

export class Response implements APIGatewayProxyResult {
  statusCode: number;
  headers?: { [header: string]: string | number | boolean } | undefined;
  multiValueHeaders?:
    | { [header: string]: (string | number | boolean)[] }
    | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;

  constructor({ statusCode = 200, headers = {}, body }: IResponse) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
    this.headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }
}
