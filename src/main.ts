import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  COMMON_PROTO_PATH,
  HOST,
  NATION_PROTO_PATH,
  PORT,
  USER_PROTO_PATH,
} from './common';
import { ValidationExceptionFilter } from 'common/filter/validation_exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['nation', 'user'],
        protoPath: [
          join(__dirname, '../', COMMON_PROTO_PATH),
          join(__dirname, '../', USER_PROTO_PATH),
          join(__dirname, '../', NATION_PROTO_PATH),
        ],
        url: `${HOST}:${PORT}`,
      },
    },
  );
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen();
}
bootstrap();
