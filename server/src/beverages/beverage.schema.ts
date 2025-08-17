import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
//import { BeverageModel } from './beverage.model';
//import {BeverageSize} from './beverageSize.schema';
//import {BeverageSizeModule} from './beverageSize.schema';

export type BeverageDocument = HydratedDocument<Beverage>;

@Schema()
export class Beverage {
  @Prop({ required: true })
   name: { type: String, required: true, unique: true }

  @Prop({ required: true })
  sizes: [{type: Types.ObjectId , ref: 'BeverageSize', required: true }];
}

export const BeverageSchema = SchemaFactory.createForClass(Beverage);

// export const BeverageSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   sizes: [{type: Types.ObjectId , ref: BeverageSize.name, required: true }]
// });
