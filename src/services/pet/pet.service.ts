import { Pet } from "../../models/pet/pet.schema.js";

export class PetService {
  public async create(petDto: any) {
    return await Pet.create(petDto);
  }
}
