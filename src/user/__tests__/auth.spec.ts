import { userMockRepo } from './mocks/user_repo.mock';

import { validateDto } from './helpers/validate-dto.helper';
import { UserLoginDto } from '../dto/auth.dto';
import { correct_login_user, wrong_login_user } from './fixtures/login.fixture';
import { AuthUserService } from '../../user/application/auth_user.service';
import { RpcException } from '@nestjs/microservices';

/** 유저 로그인  */
describe('Auth user test [login]', () => {
  let service: AuthUserService;

  beforeEach(() => {
    service = new AuthUserService(userMockRepo); //
  });

  // 유저 로그인 성공
  it('Find user and compare password [Success]', async () => {
    userMockRepo.findByEmail.mockResolvedValue(correct_login_user);
    // userMockRepo.save.mockResolvedValue(undefined);

    // DTO data 변환
    const { errors, dto } = await validateDto(UserLoginDto, correct_login_user);
    const result = await service.login(dto);

    expect(errors.length).toBe(0);
    expect(result).toEqual(correct_login_user);
  });

  // 유저 로그인 실패 (비밀번호 맞지 않음)
  it('Find user and compare password [Fail]', async () => {
    userMockRepo.findByEmail.mockResolvedValue(correct_login_user);

    // DTO data 변환
    const { errors, dto } = await validateDto(UserLoginDto, wrong_login_user);
    const result = service.login(dto);

    expect(errors.length).toBe(0);
    await expect(result).rejects.toThrow(RpcException);
  });
});
