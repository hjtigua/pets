import { Pet } from "../../models/pet/pet.schema.js";
import { MongoIdPipe, ValidateMongoId } from "../../pipes/MongoId.pipe.js";
import { NotFoundException } from "../../utils/http/exeptions/NotFoundException.js";

export class PetService {
  public async create(petDto: any) {
    const pet = new Pet(petDto);
    return await pet.save();
  }

  public async update(id: string, petUpdateDto: any) {
    const updated = await Pet.updateOne({ _id: id }, petUpdateDto);
    return updated;
  }

  public async getAll() {
    const pets = await Pet.find({});
    return pets;
  }

  @ValidateMongoId
  public async getById(@MongoIdPipe id: string) {
    const pet = await Pet.findOne({ _id: id });
    if (!pet) throw new NotFoundException(`Pet with id ${id} not found`);
    return pet;
  }

  public async delete(id: string) {
    const result = await Pet.deleteOne({ _id: id });
    return result;
  }
}
