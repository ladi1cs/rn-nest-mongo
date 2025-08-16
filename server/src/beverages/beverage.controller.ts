import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { BeverageService } from './beverage.service'

@Controller('beverages')
export class BeverageController {
  constructor(private readonly beverageService: BeverageService) {}

  @Post()
  async addBeverage(
    @Body('name') name: string,
    @Body('sizes') sizes: string[]
  ) {
    const generatedId = await this.beverageService.insertBeverage(
      name,
      sizes
    );
    return { message: 'Beverage added successfully', id: generatedId , name, sizes};
  }

  @Get()
  findAll() {
    return this.beverageService.findAll();
  }

  @Get(':id')
  findBeverage(@Param('id') id: string) {
    return this.beverageService.getBeverage(id);
  }

  @Delete(':id')
  async deleteBeverage(@Param('id') id: string) {
    await this.beverageService.removeBeverage(id);
    return { message: 'Beverage deleted successfully' };
  }

  @Patch(':id')
  async updateBeverage(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('sizes') sizes: string[],
  ) {
    const updatedBeverage = await this.beverageService.updateBeverage(
      id,
      name,
      sizes,
    );
    return { message: 'Beverage updated successfully', updatedBeverage };
  }

}
