import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    // Проверка на наличие билетов
    if (!createOrderDto.tickets || createOrderDto.tickets.length === 0) {
      throw new BadRequestException('Не указаны билеты для заказа');
    }

    // Проверка на занятые места
    const occupiedSeats = await this.findOccupiedSeats(
      createOrderDto.tickets[0].session,
    );
    const notOccupiedSeats = [];

    for (const ticket of createOrderDto.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;
      if (occupiedSeats.includes(seat)) {
        throw new ConflictException(`Место с номером ${seat} уже занято`);
      }
      notOccupiedSeats.push(seat);
    }

    // Создание заказа
    const savedOrder = await this.orderRepository.create({
      email: createOrderDto.email, // Добавляем email
      phone: createOrderDto.phone, // Добавляем phone
      tickets: createOrderDto.tickets,
    });

    // Возвращаем полный объект заказа
    return {
      id: savedOrder.id,
      email: savedOrder.email,
      phone: savedOrder.phone,
      total: savedOrder.tickets.length,
      items: savedOrder.tickets,
    };
  }

  async findOccupiedSeats(sessionId: string): Promise<string[]> {
    const orders = await this.orderRepository.findAllOrders();
    const occupiedSeats: string[] = [];

    // Проверка на то, что orders не пустой массив
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        order.tickets.forEach((ticket) => {
          if (ticket.session === sessionId) {
            occupiedSeats.push(`${ticket.row}:${ticket.seat}`);
          }
        });
      });
    }

    return occupiedSeats;
  }
}
