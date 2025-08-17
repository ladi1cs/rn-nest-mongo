import * as mongoose from 'mongoose';
import { OrderItem } from './order.schema';

export interface OrderModel extends mongoose.Document {
  customerName: string;
  contact: string;
  items?: OrderItem[];
  total: number;
  confirmationNumber: string
}
