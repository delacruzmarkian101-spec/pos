import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({ default: 'Others' })
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.products)
  seller: User;
}
