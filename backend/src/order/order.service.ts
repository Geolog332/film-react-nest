import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(orderDto: OrderDto[]): { total: number; items: OrderDto[] } {
    // Пустышка
    return {
      total: orderDto.length,
      items: orderDto,
    };
  }
}
