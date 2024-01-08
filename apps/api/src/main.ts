import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { IoAdapter } from '@nestjs/platform-socket.io';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './shared/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Common setup
  const logger = app.get(Logger);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useLogger(logger);
  app.use(helmet());
  app.use(cookieParser());

  // Exception filters
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Canny Games')
    .setDescription('The Canny Games API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // MikroORM
  app.enableShutdownHooks();

  // Start
  const port = process.env.PORT || process.env.BACKEND_APP_PORT || 3000;

  await app.listen(port, () => {
    console.info(`Listening at http://localhost:${port}/api`);
  });
}
bootstrap();
