import { User } from 'user/domain/entities/user.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Inject } from '@nestjs/common';
import { UserLoginDto } from 'user/dto/auth.dto';

/** Login and Auth */
export class AuthUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async login(dto: UserLoginDto): Promise<User> {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) {
      throw new RpcException({
        message: 'User Not Found!',
        code: status.NOT_FOUND,
      });
    }

    if (user.password !== dto.password) {
      throw new RpcException({
        message: 'Not match user data!',
        code: status.INVALID_ARGUMENT,
      });
    }

    return user;
  }
}
