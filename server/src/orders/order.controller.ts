import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
//import { OrderModel } from "./order.model";
import { OrderItem } from "./order.schema";


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body('customerName') customerName: string,
    @Body('contact') contact: string,
    @Body('items') items: OrderItem[],
    @Body('total') total: number
  ) {
    const order = {
      customerName, contact, total, items: [],
     
    }
    //console.log("order.controller.createOrder",{ order})
    const generatedId = await this.orderService.createOrder(
      customerName,
      contact,
      items,
      total
    );
    return { message: 'Order added successfully', id: generatedId };
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

}
