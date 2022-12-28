import { ObjectId } from "mongodb";
import "reflect-metadata";
import { BadRequestException } from "../utils/http/exeptions/BadRequestException.js";
const mongoIdMetadataKey = Symbol("MongoIdPipe");

export function MongoIdPipe(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingMongoIdParameters: number[] =
    Reflect.getOwnMetadata(mongoIdMetadataKey, target, propertyKey) || [];

  existingMongoIdParameters.push(parameterIndex);

  Reflect.defineMetadata(
    mongoIdMetadataKey,
    existingMongoIdParameters,
    target,
    propertyKey
  );
}

// TODO: Add this validator to either a class or a method
export function ValidateMongoId(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value!;
  descriptor.value = function () {
    let mongoIdParameters: number[] = Reflect.getOwnMetadata(
      mongoIdMetadataKey,
      target,
      propertyName
    );

    if (mongoIdParameters) {
      for (let parameterIndex of mongoIdParameters) {
        const parameterValue = arguments[parameterIndex];
        if (!parameterValue) {
          throw new BadRequestException(`Query parameter is required`);
        }
        if (!ObjectId.isValid(parameterValue)) {
          throw new BadRequestException(
            `${parameterValue} is not a valid mongo id.`
          );
        }
      }
    }

    return method.apply(this, arguments);
  };
}
