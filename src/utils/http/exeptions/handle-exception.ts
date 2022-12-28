import { InternalServerError } from "./InternalServerError.js";
import { BadRequestException } from "./BadRequestException.js";
import { parseMongoErrors } from "../../transform/parseResponse.js";

export const handleExceptions = (error: any): any => {
  // handle inBuilt exceptions
  if (isInBuiltdExeption(error)) return error;

  if (isMongoValidationErrors(error)) {
    return new BadRequestException(
      "Invalid request",
      parseMongoErrors(error.errors)
    );
  }

  // unhandle exceptions
  return new InternalServerError({
    errors: error,
  });
};

const isInBuiltdExeption = (error: any): boolean => {
  if (
    error?.headers &&
    error?.body &&
    error?.headers["Content-Type"] === "application/json"
  ) {
    return true;
  } else {
    return false;
  }
};

const isMongoValidationErrors = (error: any): boolean => {
  return error.errors ? true : false;
};
