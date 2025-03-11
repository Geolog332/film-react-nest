//TODO реализовать DTO для /orders
export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: {
    film: string;
    session: string;
    daytime: string;
    row: number;
    seat: number;
    price: number;
  }[];
}
