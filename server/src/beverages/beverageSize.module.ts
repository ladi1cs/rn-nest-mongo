import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BeverageSizeSchema, BeverageSize } from './beverageSize.schema';
import { BeverageSizeController } from './beverageSize.controller';
import { BeverageSizeService } from './beverageSize.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BeverageSize.name, schema: BeverageSizeSchema }])],
  controllers: [BeverageSizeController],
  providers: [BeverageSizeService],
})
export class BeverageSizeModule {}
