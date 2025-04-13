import { User } from '../domain/entities/user.entity';
import { Profile } from '../domain/entities/profile.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { CreateUserDto } from '../dto/user.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<undefined> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid input',
      });
    }

    const profile = new Profile();
    profile.name = dto.profileName;

    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.profile = profile;

    await this.userRepo.save(user);
  }
}
