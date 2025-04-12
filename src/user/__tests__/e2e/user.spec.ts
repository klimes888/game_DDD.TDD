// import { CreateUserDto } from 'user/dto/create_user.dto';
import { correct_user_data } from '../fixtures/user.fixture';
import { CreateUserService } from '../../../user/application/create_user.service';
import { UserRepository } from '../../../user/domain/interfaces/user_repository.interface';

describe('create user test', () => {
  let service: CreateUserService;
  let repo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    service = new CreateUserService(repo); //
  });

  it('should create a user', async () => {
    repo.findByEmail.mockResolvedValue(null);
    repo.save.mockResolvedValue(undefined);

    const dto = correct_user_data;
    await service.execute(dto);

    expect(repo.save).toHaveBeenCalled();
    expect(repo.findByEmail).toHaveBeenCalled();
  });
});
