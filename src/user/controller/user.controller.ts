import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
// import { BattleService } from '../application/battle.service';
// import { AttackDto } from '../dto/attack.dto';

class User {
  id = 1;
  email = 'test@test.com';
  name = 'test';
}

@Controller()
export class UserController {
  constructor() {}

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { id: number }) {
    const user = new User();
    if (user.id !== data.id) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }

  @GrpcMethod('UserService', 'CreateUser')
  create() {
    return '';
  }
}
