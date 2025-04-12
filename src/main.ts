import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  DB_URL,
  HOST,
  NATION_PROTO_PATH,
  PORT,
  USER_PROTO_PATH,
} from './common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['nation', 'user'],
        protoPath: [
          join(__dirname, '../', USER_PROTO_PATH),
          join(__dirname, '../', NATION_PROTO_PATH),
        ],
        url: `${HOST}:${PORT}`,
      },
    },
  );

  // const app = await NestFactory.create(AppModule);
  await app.listen();
}
bootstrap();
