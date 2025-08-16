import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BeverageSchema } from './beverage.model';
import { BeverageController } from './beverage.controller';
import { BeverageService } from './beverage.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Beverage', schema: BeverageSchema }])],
  controllers: [BeverageController],
  providers: [BeverageService],
})
export class BeverageModule {}
