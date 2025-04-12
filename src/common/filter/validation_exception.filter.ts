import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = exception.getResponse();
    const message =
      typeof response === 'string' ? response : (response as any).message;
    const code = (response as any).code || status.UNKNOWN;
    throw new RpcException({ message, code });
  }
}
