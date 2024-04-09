import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setNestAppPipes<T extends INestApplication>(app: T): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되어 있지 않은 속성이 들어오면 자동으로 제거
      forbidNonWhitelisted: true,
      transform: true, // json 데이터의 string들을 타입에 맞게 변환시켜줌 (class-transformer 모듈 필요)
    }),
  );
}
