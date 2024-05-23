import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './models/todos/todos.module';
import { UsersModule } from './models/users/users.module';
import { AddressModule } from './models/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'Password2!',
      database: 'todo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TodosModule,
    UsersModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
