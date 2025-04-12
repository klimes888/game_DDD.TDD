import { GrpcMethod } from '@nestjs/microservices';
import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create_user.dto';
import { CreateUserService } from '../application/create_user.service';

@Controller()
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { id: number }) {
    // const user = new User();
    // if (user.id !== data.id) {
    //   throw new RpcException({
    //     code: status.NOT_FOUND,
    //     message: 'User not found',
    //   });
    // }
    // return user;
  }

  @GrpcMethod('UserService', 'CreateUser')
  async create(@Body() data: CreateUserDto) {
    await this.createUserService.execute(data);
    return { ...data, code: 1, message: 'Success Create User!' };
  }
}
