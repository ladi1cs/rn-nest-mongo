import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BeverageSchema } from 'src/beverages/beverage.model';
import { BeverageSizeSchema } from 'src/beverages/beverageSize.schema';

@Module({
  imports: [MongooseModule.forFeature([
    //{ name: 'Order', schema: OrderSchema }])],
    { name: Order.name, schema: OrderSchema },
    { name: 'Beverage', schema: BeverageSchema },
    { name: 'BeverageSize', schema: BeverageSizeSchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
