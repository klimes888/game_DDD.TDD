import { CreateUserDto } from '../../user/dto/create_user.dto';
import { correct_user_data, wrong_user_datas } from './fixtures/user.fixture';
import { CreateUserService } from '../application/create_user.service';
import { userMockRepo } from './mocks/user_repo.mock';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('create user test', () => {
  let service: CreateUserService;

  beforeEach(() => {
    service = new CreateUserService(userMockRepo); //
  });

  it('should create a user', async () => {
    userMockRepo.findByEmail.mockResolvedValue(null);
    userMockRepo.save.mockResolvedValue(undefined);

    // DTO data 변환
    const dto = plainToInstance(CreateUserDto, correct_user_data);
    await service.execute(dto);

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
