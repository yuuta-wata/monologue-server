import { NestFactory } from '@nestjs/core';
import cookieparser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieparser());
  await app.listen(4001);
  console.log('http://localhost:4001/graphql');
}
bootstrap();
