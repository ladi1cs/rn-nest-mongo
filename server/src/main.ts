import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { UsersController } from './users/users.controller';
//import { UsersService } from './users/users.service';
import { Model } from 'mongoose';
//import { User } from './users/users.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
// async function testDB(){
//   const userModel:Model<User> = { }
//   const userController = new UsersController(new UsersService(userModel))
// }
bootstrap();
