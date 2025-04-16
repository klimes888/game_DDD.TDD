import { GetUserDto } from '../dto/user.dto';
import { found_user_data, wrong_user_ids } from './fixtures/user.fixture';

import { userMockRepo } from './mocks/user_repo.mock';

import { RpcException } from '@nestjs/microservices';
import { validateDto } from './helpers/validate-dto.helper';
import { GetUserService } from '../../user/application';

/** 유저 조회 */
describe('Find user info test', () => {
  let service: GetUserService;

  beforeEach(() => {
    service = new GetUserService(userMockRepo); //
  });

  // success found user
  it('Success find user info', async () => {
    userMockRepo.findById.mockResolvedValue(found_user_data);

    const { errors, dto } = await validateDto(GetUserDto, { id: 1 });
    const user = await service.get(dto);

    expect(user).toEqual(found_user_data);
    expect(errors.length).toBe(0);
  });

  // Not found user
  it('Not found user info', async () => {
    // 유저가 존재하지 않음
    userMockRepo.findById.mockResolvedValue(null);

    const { dto } = await validateDto(GetUserDto, { id: 999 });
    // gRPC 에러 return
    await expect(service.get(dto)).rejects.toThrow(RpcException);
  });

  // each fail usecase
  it.each(wrong_user_ids)('wrong find user by id: $reason', async (id) => {
    userMockRepo.findById.mockResolvedValue(null);

    const { errors } = await validateDto(GetUserDto, { id });

    expect(errors.length).toBeGreaterThan(0);
  });
});
