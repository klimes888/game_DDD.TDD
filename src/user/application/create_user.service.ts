import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { CreateUserDto } from '../dto/user.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Inject } from '@nestjs/common';
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'already user exist',
      });
    }

    // factory 패턴
    const user = User.create(dto.email, dto.password, dto.profileName);

    return this.userRepo.save(user);
  }
}
