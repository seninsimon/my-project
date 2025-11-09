import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  
  const port = process.env.PORT ?? 3000;
  app.enableCors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,

  })
  await app.listen(port);

  console.log(`server ready on http://localhost:${port}`);
}

bootstrap();
