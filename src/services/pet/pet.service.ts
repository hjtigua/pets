import { Pet } from "../../models/pet/pet.schema.js";
import { MongoIdPipe, ValidateMongoId } from "../../pipes/MongoId.pipe.js";
import { BadRequestException } from "../../utils/http/exeptions/BadRequestException.js";
import { NotFoundException } from "../../utils/http/exeptions/NotFoundException.js";

export class PetService {
  public async create(petDto: any) {
    const pet = new Pet(petDto);
    return await pet.save();
  }

  @ValidateMongoId
  public async update(@MongoIdPipe id: string, petUpdateDto: any) {
    //TODO: Run Validations on update method
    const updated = await Pet.findOneAndUpdate({ _id: id }, petUpdateDto, {
      returnDocument: "after",
    });
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

  public async delete(@MongoIdPipe id: string) {
    const result = await Pet.deleteOne({ _id: id });
    if (result.deletedCount <= 0)
      throw new NotFoundException(`Pet with id ${id} not found`);
    return result;
  }

  @ValidateMongoId
  public async addChilds(@MongoIdPipe parentID: string, childIDS: string[]) {
    const childsIncludesParentID: boolean = childIDS.some(
      (child) => child === parentID
    );

    if (childsIncludesParentID)
      throw new BadRequestException(
        `Parent id ${parentID} is includes in childs array`
      );

    const result = Pet.updateOne(
      { _id: parentID },
      {
        $addToSet: {
          childs: {
            $each: childIDS,
          },
        },
      }
    );
    return result;
  }

  @ValidateMongoId
  public async removeChild(@MongoIdPipe parentID: string, childID: string) {
    const result = await Pet.updateOne(
      { _id: parentID },
      {
        $pull: { childs: childID },
      }
    );

    if (result.modifiedCount <= 0)
      throw new NotFoundException(`Parent or child with not found`);

    return result;
  }
}
