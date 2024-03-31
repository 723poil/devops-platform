import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setSwagger(app);

  await app.listen(3031);
}
bootstrap();
