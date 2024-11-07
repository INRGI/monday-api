import { Controller, Get, Param } from '@nestjs/common';
import { MondayApiService } from './monday-api.service';

@Controller('monday')
export class MondayApiController {
  constructor(private readonly mondayService: MondayApiService) {}

  @Get('product/:productName')
  async getProduct(@Param('productName') product: string) {
    return await this.mondayService.findProductByName(product);
  }
}
