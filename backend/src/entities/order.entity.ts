import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('jsonb', { array: true })
  tickets: {
    film: string;
    session: string;
    daytime: string;
    day?: string;
    time?: string;
    row: number;
    seat: number;
    price: number;
  }[];
}
