import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products')
  create(@Body() body: any) {
    const sellerId = parseInt(body.sellerId);
    return this.productsService.create(body, sellerId);
  }

  @Get('products')
  findAll(@Query('activeOnly') activeOnly: string) {
    return this.productsService.findAll(activeOnly === 'true');
  }

  @Put('products/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(parseInt(id), body, body.sellerId);
  }

  @Delete('products/:id')
  remove(@Param('id') id: string, @Query('sellerId') sellerId: string) {
    return this.productsService.remove(parseInt(id), parseInt(sellerId));
  }

  @Post('orders')
  buy(@Body() body: any) {
    return this.productsService.buy(
      body.productId,
      body.buyerId,
      body.quantity,
    );
  }

  @Get('orders')
  getOrders(@Query('userId') userId: string, @Query('role') role: string) {
    return this.productsService.getOrders(parseInt(userId), role);
  }
}
