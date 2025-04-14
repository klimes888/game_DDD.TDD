import { CreateUserDto, GetUserDto, ModifyUserDto } from '../dto/user.dto';
import {
  correct_user_data,
  found_user_data,
  modify_user_data,
  wrong_modify_user_data,
  wrong_user_datas,
  wrong_user_ids,
} from './fixtures/user.fixture';
import {
  CreateUserService,
  GetUserService,
  ModifyUserService,
} from '../application';
import { userMockRepo } from './mocks/user_repo.mock';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RpcException } from '@nestjs/microservices';

/** 유저 생성 */
describe('Create user test', () => {
  let service: CreateUserService;

  beforeEach(() => {
    service = new CreateUserService(userMockRepo); //
  });

  it('should create a user', async () => {
    userMockRepo.findByEmail.mockResolvedValue(null);
    userMockRepo.save.mockResolvedValue(undefined);

    // DTO data 변환
    const dto = plainToInstance(CreateUserDto, correct_user_data);
    await service.create(dto);

    // error 검증
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(userMockRepo.save).toHaveBeenCalled();
    expect(userMockRepo.findByEmail).toHaveBeenCalled();
  });

  it.each(wrong_user_datas)('should invalid value: $reason', async (val) => {
    userMockRepo.findByEmail.mockResolvedValue(null);

    const dto = plainToInstance(CreateUserDto, val);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

/** 유저 조회 */
describe('Find user info test', () => {
  let service: GetUserService;

  beforeEach(() => {
    service = new GetUserService(userMockRepo); //
  });

  // success found user
  it('Success find user info', async () => {
    userMockRepo.findById.mockResolvedValue(found_user_data);

    const dto = plainToInstance(GetUserDto, { id: 1 });
    const errors = await validate(dto);
    const user = await service.get(dto);

    expect(user).toEqual(found_user_data);
    expect(errors.length).toBe(0);
  });

  // Not found user
  it('Not found user info', async () => {
    // 유저가 존재하지 않음
    userMockRepo.findById.mockResolvedValue(null);

    const dto = plainToInstance(GetUserDto, { id: 999 });
    // gRPC 에러 return
    await expect(service.get(dto)).rejects.toThrow(RpcException);
  });

  // each fail usecase
  it.each(wrong_user_ids)('wrong find user by id: $reason', async (id) => {
    userMockRepo.findById.mockResolvedValue(null);

    const dto = plainToInstance(GetUserDto, { id });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

/** 유저 수정 */
describe('Modifing user info', () => {
  let service: ModifyUserService;

  beforeEach(() => {
    service = new ModifyUserService(userMockRepo);
  });

  it('Success modifing user data', async () => {
    userMockRepo.findById.mockResolvedValue(found_user_data);
    userMockRepo.modify.mockResolvedValue(modify_user_data);
    // dto valid 검증
    const dto = plainToInstance(ModifyUserDto, modify_user_data);
    const errors = await validate(dto);

    expect(errors.length).toBe(0);

    // 저장 로직 검증
    const user = await service.modify(dto);
    expect(user).toEqual(modify_user_data);
  });

  // Not found user
  it('Not found user info for modify', async () => {
    // 유저가 존재하지 않음
    userMockRepo.findById.mockResolvedValue(null);

    const dto = plainToInstance(GetUserDto, { id: 999 });
    // gRPC 에러 return
    await expect(service.modify(dto)).rejects.toThrow(RpcException);
  });

  it.each(wrong_modify_user_data)(
    'Insert wrong user data fail: $reason',
    async (data) => {
      userMockRepo.findById.mockResolvedValue(found_user_data);

      const dto = plainToInstance(ModifyUserDto, data);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    },
  );
});
