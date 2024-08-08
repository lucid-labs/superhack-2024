import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    methods: 'POST,OPTIONS',
    credentials: true, // Allow credentials such as cookies
  });
  await app.listen(3000);
}
bootstrap();
