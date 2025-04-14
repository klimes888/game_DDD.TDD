import { User } from '../../user/domain/entities/user.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Inject } from '@nestjs/common';
import { ModifyUserDto } from 'user/dto/user.dto';

export class ModifyUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async modify(dto: ModifyUserDto): Promise<User> {
    const user = await this.userRepo.findById(dto.id);

    if (!user) {
      throw new RpcException({
        message: 'User Not Found!',
        code: status.NOT_FOUND,
      });
    }
    // factory
    const data = User.modify(dto.password, dto.profileName);

    const modifiedUser = await this.userRepo.modify(data);

    return modifiedUser;
  }
}
