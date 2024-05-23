import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Swagger
// Swagger
const config = new DocumentBuilder()
  .setTitle('Todo Swagger API')
  .setVersion('1.0')
  .setContact('Joscha Sattler', '', 'joscha.sattler@web.de')
  .build();

// init function
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().then();
