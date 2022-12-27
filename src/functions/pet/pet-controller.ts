import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { mongoConnection } from "../../db/mongooseDB.js";
import { Response } from "../../utils/http/success/Response.js";
import { BadRequestException } from "../../utils/http/exeptions/BadRequestException.js";
import { PetService } from "../../services/pet/pet.service.js";
import { handleExceptions } from "../../utils/http/exeptions/handle-exception.js";

await mongoConnection();
const petService = new PetService();

export const create = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { body } = _event;
  try {
    if (!body) throw new BadRequestException("body is required");
    const data = JSON.parse(body);
    const result = await petService.create(data);

    return new Response({
      body: result,
    });
  } catch (error) {
    return handleExceptions(error);
  }
};

export const getAll = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const pets = await petService.getAll();
    return new Response({
      body: pets,
    });
  } catch (error) {
    return handleExceptions(error);
  }
};

export const getById = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = _event.pathParameters;
  const petId = params?.id;
  try {
    const pet = await petService.getById(petId!);
    return new Response({
      body: pet,
    });
  } catch (error) {
    return handleExceptions(error);
  }
};
