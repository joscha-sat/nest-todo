import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './models/todos/todos.module';
import { UsersModule } from './models/users/users.module';
import { AddressModule } from './models/address/address.module';
import { AuthModule } from './auth/auth.module';
import { RequestLoggerMiddleware } from './shared/middleware/request-logger-middleware.service';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    if (process.env.NODE_ENV !== 'production') {
      this.logger.log(JSON.stringify(process.env));
    }
  }
}
