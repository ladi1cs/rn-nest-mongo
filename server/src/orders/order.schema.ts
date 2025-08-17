import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Beverage', required: true })
  beverageId: Types.ObjectId;

  @Prop({ type: String, required: true })
  sizeId: string;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: false })
  totalPrice: number;

  @Prop({ required: true, unique: true })
  confirmationNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);