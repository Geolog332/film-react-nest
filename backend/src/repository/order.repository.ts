import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderDto: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderDto);
    return this.orderRepository.save(order);
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
