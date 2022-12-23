import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { mongoConnection } from "../db/mongooseDB.js";
import { Pet } from "../models/pet/pet.schema.js";
import { Response } from "../utils/http/success/Response.js";
import { BadRequestException } from "../utils/http/exeptions/BadRequestException.js";

await mongoConnection();

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { body } = _event;
  if (!body) return new BadRequestException();

  const data = JSON.parse(body);
  const result = await Pet.create(data);

  return new Response({
    body: result,
  });
};
