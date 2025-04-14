import { User } from 'user/domain/entities/user.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { GetUserDto } from '../dto/user.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Inject } from '@nestjs/common';

export class GetUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: GetUserDto): Promise<User> {
    const user = await this.userRepo.findById(dto.id);

    if (!user) {
      throw new RpcException({
        message: 'User Not Found!',
        code: status.NOT_FOUND,
      });
    }

    return user;
  }
}
