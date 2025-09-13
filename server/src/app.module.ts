import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BeverageSizeModule } from './beverages/beverageSize.module';
import { BeverageModule } from './beverages/beverage.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    BeverageModule,
    BeverageSizeModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
