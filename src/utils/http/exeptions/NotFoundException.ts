import { APIGatewayProxyResult } from "aws-lambda";

export class NotFoundException implements APIGatewayProxyResult {
  statusCode: number;
  headers?: { [header: string]: string | number | boolean } | undefined;
  multiValueHeaders?:
    | { [header: string]: (string | number | boolean)[] }
    | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;

  constructor(message = "Not found", errors?: any) {
    this.headers = {
      "Content-Type": "application/json",
    };
    this.statusCode = 404;
    this.body = JSON.stringify({
      code: 404,
      message: message,
      errors: errors,
    });
  }
}
