import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './config/swagger';
import { setNestAppInterceptors } from './config/interceptor';
import { setNestAppPipes } from './config/pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  setSwagger(app);
  setNestAppInterceptors(app);
  setNestAppPipes(app);

  await app.listen(3031);
}
bootstrap();
