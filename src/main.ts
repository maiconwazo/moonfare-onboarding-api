import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/decorators/http-exception-filter';
import 'reflect-metadata';

async function bootstrap() {
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        package: 'onboarding',
        protoPath: join(__dirname, 'onboarding/onboarding.proto'),
        url: process.env.ONBOARDING_API_ENDPOINT,
      },
    });
  microservice.useGlobalFilters(new HttpExceptionFilter());
  await microservice.listen();
}
bootstrap();
