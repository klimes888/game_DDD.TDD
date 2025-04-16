import { GrpcMethod } from '@nestjs/microservices';
import { Body, Controller } from '@nestjs/common';
import { CreateUserDto, GetUserDto } from '../dto/user.dto';
import { CreateUserService } from '../application/create_user.service';
import { GetUserService } from 'user/application/get_user.service';
import { UserLoginDto } from 'user/dto/auth.dto';
import { AuthUserService } from 'user/application/auth_user.service';

@Controller()
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly authUserService: AuthUserService,
  ) {}

  // 유저 찾기
  @GrpcMethod('UserService', 'GetUser')
  async getUser(@Body() data: GetUserDto) {
    const user = await this.getUserService.get(data);
    return { data: user, code: 2, message: 'Success Find User!' };
  }

  // 유저 생성
  @GrpcMethod('UserService', 'CreateUser')
  async create(@Body() data: CreateUserDto) {
    const result = await this.createUserService.create(data);
    return { data: result, code: 1, message: 'Success Create User!' };
  }

  // 유저 로그인
  @GrpcMethod('UserService', 'LoginUser')
  async login(@Body() data: UserLoginDto) {
    const result = await this.authUserService.login(data);
    return { data: result, code: 3, message: 'Success Login User!' };
  }
}
