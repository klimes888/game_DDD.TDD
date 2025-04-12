import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './domain/user.entity';
import { CreateUserService } from './application/create_user.service';
import { UserController } from './controller/user.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService],
  exports: [CreateUserService],
})
export class UserModule {}
