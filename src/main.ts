import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  // Alphabetize the paths
  document.paths = Object.keys(document.paths)
    .sort((path1, path2) => path1.localeCompare(path2))
    .reduce((obj, key) => {
      obj[key] = document.paths[key];
      return obj;
    }, {} as any);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().then();
