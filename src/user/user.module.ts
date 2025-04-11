import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './domain/user.entity';
import { UserService } from './application/user.service';
import { UserController } from './controller/user.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
