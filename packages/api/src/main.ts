import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version } from '../package.json';
import { API_DOMAIN, API_PORT, SWAGGER_PATH } from '@booking/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log'] });
  const logger = new Logger('Main');

  if (process.env['NODE_ENV'] === 'development') {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const config = new DocumentBuilder()
      .setTitle('Booking API')
      .setDescription('API of booking system')
      .setVersion(version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SWAGGER_PATH, app, document);
    logger.log(`Swagger: ${API_DOMAIN}/${SWAGGER_PATH}`);
  }

  app.enableCors();
  await app.listen(API_PORT);
  logger.log(`Listening: http://localhost:${API_PORT}`);
}
bootstrap();
