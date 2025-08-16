import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Beverage } from './beverage.model';

@Injectable()
export class BeverageService {
  constructor(@InjectModel('Beverage') private readonly beverageModel: Model<Beverage>) {}

  async insertBeverage(name: string, sizes: string[]) {
    const newBeverage = new this.beverageModel({
      name, 
      sizes
    });
    const result = await newBeverage.save();
    return result.id as string;
  }

  async findAll() {
    return this.beverageModel.find().exec();
  }

  async getBeverage(id: string) {
      const beverage = await this.beverageModel.findById(id);
      return beverage;
  }
   
  async removeBeverage(id: string) {
    const result = await this.beverageModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find beverage.');
    }

    return result;
  }

  async updateBeverage(id: string, name: string, sizes: string[]) {
    const updated = await this.getBeverage(id);

    if (name) {
      updated.name = name;
    }

    if (Array.isArray(sizes)) {
      updated.sizes = sizes;
    }
    
    const saved = await updated.save();
    return saved;
  }


}
