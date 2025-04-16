import { ModifyUserDto } from '../dto/user.dto';
import {
  found_user_data,
  modify_user_data,
  wrong_modify_user_data,
} from './fixtures/user.fixture';
import { ModifyUserService } from '../application';
import { userMockRepo } from './mocks/user_repo.mock';

import { RpcException } from '@nestjs/microservices';
import { validateDto } from './helpers/validate-dto.helper';

/** 유저 수정 */
describe('Modifing user info', () => {
  let service: ModifyUserService;

  beforeEach(() => {
    service = new ModifyUserService(userMockRepo);
  });

  // 유저 정보 수정 성공 케이스
  it('Success modifing user data', async () => {
    userMockRepo.findById.mockResolvedValue(found_user_data);
    userMockRepo.modify.mockResolvedValue(undefined);

    // dto valid 검증
    const { errors, dto } = await validateDto(ModifyUserDto, modify_user_data);

    expect(errors.length).toBe(0);

    // 저장 로직 검증
    await service.modify(dto);
    expect(userMockRepo.modify).toHaveBeenCalled();
  });

  // 유저 정보 찾기 실패 케이스
  it('Not found user info for modify', async () => {
    // 유저가 존재하지 않음
    userMockRepo.findById.mockResolvedValue(null);

    const { dto } = await validateDto(ModifyUserDto, { id: 999 });

    // gRPC 에러 return
    await expect(service.modify(dto)).rejects.toThrow(RpcException);
  });

  // 유저 수정에 잘못 된 값을 입력했을 경우 발생하는 에러
  it.each(wrong_modify_user_data)(
    'Insert wrong user data fail: $reason',
    async (data) => {
      userMockRepo.findById.mockResolvedValue(found_user_data);

      const { errors } = await validateDto(ModifyUserDto, data);
      expect(errors.length).toBeGreaterThan(0);
    },
  );
});
