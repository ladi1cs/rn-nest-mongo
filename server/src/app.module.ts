import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
//import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BeverageSizeModule } from './beverages/beverageSize.module';
//import { BeverageTypeModule } from './beverages/beverageType.module';
import { BeverageModule } from './beverages/beverage.module';
//import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    //UsersModule,
    BeverageModule,
    BeverageSizeModule,
    //OrderModule,
    //BeverageTypeModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
    //  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.re3ha3x.mongodb.net/nestjs-crud-app`,
  "mongodb+srv://ladisdev:Sisma4as@lscluster.hirjveg.mongodb.net/?retryWrites=true&w=majority&appName=LSCluster",
      
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
