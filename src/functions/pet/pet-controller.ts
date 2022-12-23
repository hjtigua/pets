import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { mongoConnection } from "../../db/mongooseDB.js";
import { Response } from "../../utils/http/success/Response.js";
import { BadRequestException } from "../../utils/http/exeptions/BadRequestException.js";
import { PetService } from "../../services/pet/pet.service.js";

await mongoConnection();
const petService = new PetService();

export const create = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { body } = _event;
  if (!body) throw new BadRequestException("body is required");

  const data = JSON.parse(body);
  const result = await petService.create(data);

  return new Response({
    body: result,
  });
};
