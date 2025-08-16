import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { BeverageSize } from './beverageSize.schema';

export const BeverageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sizes: [{type: Types.ObjectId , ref: BeverageSize.name, required: true }]
});

export interface Beverage extends mongoose.Document {
  id: string;
  name: string;
  sizes: string[];
}
