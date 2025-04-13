import { User } from 'user/domain/entities/user.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { GetUserDto } from '../dto/user.dto';

export class GetUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: GetUserDto): Promise<User> {
    const user = await this.userRepo.findById(dto.id);
    return user;
  }
}
