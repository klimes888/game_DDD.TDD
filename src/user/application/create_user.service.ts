import { User } from '../domain/entities/user.entity';
import { Profile } from '../domain/entities/profile.entity';
import { UserRepository } from '../domain/interfaces/user_repository.interface';
import { CreateUserDto } from '../dto/create_user.dto';

export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}


    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error('User already exists');
    }

    const profile = new Profile();
    profile.name = dto.profileName;

    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.profile = profile;

    return await this.userRepo.save(user);
  }
}
