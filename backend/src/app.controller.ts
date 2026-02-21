import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/register')
  register(@Body() body: any) {
    return this.appService.register(body);
  }

  @Post('auth/login')
  login(@Body() body: any) {
    return this.appService.login(body.username, body.password);
  }

  @Post('products')
  createProduct(@Body() body: any) {
    return this.appService.createProduct(body, body.sellerId);
  }

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Post('orders')
  buyProduct(@Body() body: any) {
    return this.appService.buyProduct(
      body.productId,
      body.buyerId,
      body.quantity,
    );
  }

  @Get('orders')
  getOrders(@Query('userId') userId: string, @Query('role') role: string) {
    return this.appService.getOrders(parseInt(userId), role);
  }
}
