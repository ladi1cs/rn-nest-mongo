import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BeverageSizeDocument = HydratedDocument<BeverageSize>;

@Schema()
export class BeverageSize {
  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  price: number;
}

export const BeverageSizeSchema = SchemaFactory.createForClass(BeverageSize);
