import { Pet } from "../../models/pet/pet.schema.js";
import { MongoIdPipe, ValidateMongoId } from "../../pipes/MongoId.pipe.js";
import { BadRequestException } from "../../utils/http/exeptions/BadRequestException.js";
import { InternalServerError } from "../../utils/http/exeptions/InternalServerError.js";
import { NotFoundException } from "../../utils/http/exeptions/NotFoundException.js";
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

  public async update(id: string, petUpdateDto: any) {
    try {
      const updated = await Pet.updateOne({ _id: id }, petUpdateDto);
      return updated;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async getAll() {
    try {
      const pets = await Pet.find({});
      return pets;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  @ValidateMongoId
  public async getById(@MongoIdPipe id: string) {
    try {
      const pet = await Pet.findOne({ _id: id });
      if (!pet) throw new NotFoundException(`Pet with id ${id} not found`);
      return pet;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async delete(id: string) {
    try {
      const result = await Pet.deleteOne({ _id: id });
      return result;
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
