import { CreateUserDto } from '../dto/user.dto';
import { correct_user_data, wrong_user_datas } from './fixtures/user.fixture';
import { CreateUserService } from '../application';
import { userMockRepo } from './mocks/user_repo.mock';

import { validateDto } from './helpers/validate-dto.helper';

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
    const { errors, dto } = await validateDto(CreateUserDto, correct_user_data);
    await service.create(dto);

    expect(errors.length).toBe(0);
    expect(userMockRepo.save).toHaveBeenCalled();
    expect(userMockRepo.findByEmail).toHaveBeenCalled();
  });

  it.each(wrong_user_datas)('should invalid value: $reason', async (val) => {
    userMockRepo.findByEmail.mockResolvedValue(null);

    const { errors } = await validateDto(CreateUserDto, val);
    expect(errors.length).toBeGreaterThan(0);
  });
});
