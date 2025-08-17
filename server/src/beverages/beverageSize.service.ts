import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
//import { BeverageSize } from "./beverageSize.schema";
import { BeverageSizeModel } from "./beverageSize.model";

@Injectable()
export class BeverageSizeService {
  constructor(
    @InjectModel('BeverageSize') private readonly sizeModel: Model<BeverageSizeModel>,
  ) {}

  async createSize(size: string, price: number) {
    const newSize = new this.sizeModel({size, price})

    const result = await newSize.save();

    return result.id as string;
  }

  async findAll() {
    return this.sizeModel.find().exec();
  }

  async getSize(id: string) {
   return await this.sizeModel.findById(id);
}
 
async removeSize(id: string) {
   const result = await this.sizeModel.deleteOne({ _id: id }).exec();
  if (result.deletedCount === 0) {
    throw new NotFoundException('Could not find size.');
  }

  return result;
}

async updateSize(id: string, size: string, price: number) {
  const updated = await this.getSize(id);

  if (size) {
    updated.size = size;
  }

  if (price) {
    updated.price = price;
  }
  
  return await updated.save();
}

}
