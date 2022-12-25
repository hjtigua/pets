import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { mongoConnection } from "../../db/mongooseDB.js";
import { Response } from "../../utils/http/success/Response.js";
import { BadRequestException } from "../../utils/http/exeptions/BadRequestException.js";
import { PetService } from "../../services/pet/pet.service.js";
import { parseMongoId } from "../../utils/validation/isMongoId.js";

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

export const getAll = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const pets = await petService.getAll();
  return new Response({
    body: pets,
  });
};

export const getById = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = _event.pathParameters;
  const petId = params?.id;
  const validatedId = parseMongoId(petId);
  const pet = await petService.getById(validatedId);

  return new Response({
    body: pet,
  });
};
