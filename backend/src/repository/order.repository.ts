import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../order/schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(orderDto: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderDto);
    return createdOrder.save();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}
