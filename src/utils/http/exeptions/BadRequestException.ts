import { APIGatewayProxyResult } from "aws-lambda";

export class BadRequestException implements APIGatewayProxyResult {
  statusCode: number;
  headers?: { [header: string]: string | number | boolean } | undefined;
  multiValueHeaders?:
    | { [header: string]: (string | number | boolean)[] }
    | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;

  constructor(message = "Bad request", errors?: any) {
    this.log(message);
    this.log(errors);

    this.headers = {
      "Content-Type": "application/json",
    };
    this.statusCode = 400;
    this.body = JSON.stringify({
      code: 400,
      message: message,
      errors: errors,
    });
  }

  private log(error?: any) {
    if (error) console.log(error);
  }
}
