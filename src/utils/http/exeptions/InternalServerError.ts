import { APIGatewayProxyResult } from "aws-lambda";

export class InternalServerError implements APIGatewayProxyResult {
  statusCode: number;
  headers?: { [header: string]: string | number | boolean } | undefined;
  multiValueHeaders?:
    | { [header: string]: (string | number | boolean)[] }
    | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;

  constructor(message = "Internal server error.") {
    this.headers = {
      "Content-Type": "application/json",
    };
    this.statusCode = 500;
    this.body = JSON.stringify({
      code: 500,
      message: message,
    });
  }
}
