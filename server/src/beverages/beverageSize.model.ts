import * as mongoose from 'mongoose';

export interface BeverageSizeModel extends mongoose.Document {
  id: string;
  size: string;
  price: number;
}
