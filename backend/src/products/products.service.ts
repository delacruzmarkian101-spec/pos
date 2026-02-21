import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  async create(data: any, sellerId: number) {
    const seller = await this.userRepo.findOne({ where: { id: sellerId } });
    if (!seller || seller.role !== 'seller') {
      throw new UnauthorizedException('Only sellers can add products');
    }
    const product = this.productRepo.create({ ...data, seller });
    return this.productRepo.save(product);
  }

  async findAll(activeOnly: boolean = false) {
    const where = activeOnly ? { isActive: true } : {};
    return this.productRepo.find({ where, relations: ['seller'] });
  }

  async update(id: number, data: any, sellerId: number) {
    const product = await this.productRepo.findOne({
      where: { id, seller: { id: sellerId } },
    });
    if (!product)
      throw new BadRequestException('Product not found or unauthorized');

    Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async remove(id: number, sellerId: number) {
    const product = await this.productRepo.findOne({
      where: { id, seller: { id: sellerId } },
    });
    if (!product)
      throw new BadRequestException('Product not found or unauthorized');

    product.isActive = false;
    return this.productRepo.save(product);
  }

  async buy(productId: number, buyerId: number, quantity: number) {
    const buyer = await this.userRepo.findOne({ where: { id: buyerId } });
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!buyer) throw new UnauthorizedException('Buyer not found');
    if (!product || product.stock < quantity) {
      throw new BadRequestException(
        'Product not available or insufficient stock',
      );
    }

    const order = this.orderRepo.create({
      buyer,
      product,
      quantity,
      totalPrice: product.price * quantity,
    });

    product.stock -= quantity;
    await this.productRepo.save(product);
    return this.orderRepo.save(order);
  }

  async getOrders(userId: number, role: string) {
    if (role === 'buyer') {
      return this.orderRepo.find({
        where: { buyer: { id: userId } },
        relations: ['product'],
      });
    } else {
      return this.orderRepo.find({
        where: { product: { seller: { id: userId } } },
        relations: ['product', 'buyer'],
      });
    }
  }
}
