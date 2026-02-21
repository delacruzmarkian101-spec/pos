import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  // Auth
  async register(data: any) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  // Products
  async createProduct(data: any, sellerId: number) {
    const seller = await this.userRepo.findOne({ where: { id: sellerId } });
    if (!seller || seller.role !== 'seller') {
      throw new UnauthorizedException('Only sellers can add products');
    }
    const product = this.productRepo.create({ ...data, seller });
    return this.productRepo.save(product);
  }

  async getProducts() {
    return this.productRepo.find({ relations: ['seller'] });
  }

  // Orders
  async buyProduct(productId: number, buyerId: number, quantity: number) {
    const buyer = await this.userRepo.findOne({ where: { id: buyerId } });
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!buyer) {
      throw new UnauthorizedException('Buyer not found');
    }

    if (!product || product.stock < quantity) {
      throw new BadRequestException(
        'Product not available or insufficient stock',
      );
    }

    const order = this.orderRepo.create({
      buyer: buyer,
      product: product,
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
      // Seller sees orders for their products
      return this.orderRepo.find({
        where: { product: { seller: { id: userId } } },
        relations: ['product', 'buyer'],
      });
    }
  }
}
