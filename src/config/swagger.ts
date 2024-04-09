import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from '@nestjs/swagger';

export function setSwagger<T extends INestApplication>(app: T): void {

    /**
     * 스웨거 설정
     */
    const config: DocumentBuilder = new DocumentBuilder()
        .setTitle('Devops platform study')
        .setDescription('Devops platform study API description')
        .setVersion('1.0');

    const options: SwaggerDocumentOptions = {
        ignoreGlobalPrefix: false,
    };

    const document = SwaggerModule.createDocument(app, config.build(), options);
    SwaggerModule.setup('swagger', app, document);
}
