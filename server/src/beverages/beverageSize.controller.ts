import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BeverageSizeService } from "./beverageSize.service";

@Controller('beveragesizes')
export class BeverageSizeController {
  constructor(private readonly beverageSizeService: BeverageSizeService) {}

  @Post()
  async addSize(
    @Body('size') size: string,
    @Body('price') price: number,
  ) {
    const generatedId = await this.beverageSizeService.createSize(
      size,
      price,
    );
    return { message: 'Size added successfully', id: generatedId };
  }
  @Get()
  findAll() {
    return this.beverageSizeService.findAll();
  }


  @Get(':id')
  findSize(@Param('id') id: string) {
    return this.beverageSizeService.getSize(id);
  }

  @Delete(':id')
  async deleteSize(@Param('id') id: string) {
    await this.beverageSizeService.removeSize(id);
    return { message: 'Beverage deleted successfully' };
  }

  @Patch(':id')
  async updateSize(
    @Param('id') id: string,
    @Body('size') size: string,
    @Body('price') price: number,
  ) {
    const updated = await this.beverageSizeService.updateSize(
      id,
      size,
      price
    );
    return { message: 'Beverage Size updated successfully', updated };
  }

}
