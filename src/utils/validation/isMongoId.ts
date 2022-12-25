import mongoose from "mongoose";
import { BadRequestException } from "../http/exeptions/BadRequestException.js";

export const parseMongoId = (id?: string) => {
  if (!id) throw new BadRequestException("Id not valid");
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new BadRequestException(`${id} is not a valid mongo id`);
  return id;
};
