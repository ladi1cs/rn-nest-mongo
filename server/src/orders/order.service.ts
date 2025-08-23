import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Beverage } from "../beverages/beverage.model";
import { Order, OrderItem } from "./order.schema";
import { BeverageSize } from "src/beverages/beverageSize.schema";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('Beverage') private beverageModel: Model<Beverage>,
    @InjectModel('BeverageSize') private beverageSizeModel: Model<BeverageSize>,
  ) {}

  async createOrder ( 
    customerName: string,
    contact: string,
    items: OrderItem[],
    total: number) {

    let totalPrice = 0;
    
    for (const item of items) {
        if(!!item) {
            const beverage = await this.beverageModel.findById(item?.beverageId);
            const size = await this.beverageSizeModel.findById(item?.sizeId);

            //console.log("order.service.createOrder",{ beverage, size})
            if (!beverage) throw new NotFoundException('Invalid beverage  ID provided');
            if (!size) throw new NotFoundException('Invalid size ID for beverage provided');

            totalPrice += size.price * item.quantity;
        }
    }

    const order = new this.orderModel({
      customerName,
      contact,
      items,
      totalPrice: total || totalPrice,
      confirmationNumber: `ORD-${Date.now()}`,
    });
    const saved = await order.save();
    const confNumber = saved?.confirmationNumber;
    //console.log("order.service.createOrder",{order, confNumber})
    return confNumber;
  }

  async findAll() {
    return this.orderModel.find().exec();
  }
}
