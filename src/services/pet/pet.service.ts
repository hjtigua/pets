import { Pet } from "../../models/pet/pet.schema.js";
import { BadRequestException } from "../../utils/http/exeptions/BadRequestException.js";
import { InternalServerError } from "../../utils/http/exeptions/InternalServerError.js";
import { parseErrors } from "../../utils/transform/parseResponse.js";

export class PetService {
  public async create(petDto: any) {
    try {
      const pet = new Pet(petDto);
      return await pet.save();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any) {
    if (error.errors)
      throw new BadRequestException(
        "Invalid request",
        parseErrors(error.errors)
      );
    throw new InternalServerError({ message: error });
  }
}
