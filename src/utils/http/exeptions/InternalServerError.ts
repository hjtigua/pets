import { APIGatewayProxyResult } from "aws-lambda";

interface IInternalServerException {
  message?: string;
  errors?: any;
}

export class InternalServerError implements APIGatewayProxyResult {
  statusCode: number;
  headers?: { [header: string]: string | number | boolean } | undefined;
  multiValueHeaders?:
    | { [header: string]: (string | number | boolean)[] }
    | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;

  constructor(error?: IInternalServerException) {
    this.log(error?.errors);
    this.log(error?.message);
    const message = error?.message || "Error interno del servidor";
    this.headers = {
      "Content-Type": "application/json",
    };
    this.statusCode = 500;
    this.body = JSON.stringify({
      code: 500,
      message,
    });
  }

  private log(error?: any) {
    if (error) console.log(error);
  }
}
