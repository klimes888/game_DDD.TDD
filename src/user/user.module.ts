import { Module } from '@nestjs/common';
import { User } from '../user/domain/entities/user.entity';
import { CreateUserService } from './application/create_user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserService } from './application/get_user.service';
import { UserRepositoryImpl } from './infra/user.repository';
import { Profile } from './domain/entities/profile.entity';
import { AuthUserService } from './application/auth_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    GetUserService,
    AuthUserService,
    UserRepositoryImpl,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUserService],
})
export class UserModule {}
