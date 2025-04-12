import { CreateUserService } from '../../application/create_user.service';
import { User } from '../../domain/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserRepository } from '../../domain/interfaces/user_repository.interface';
import { user_email, wrong_user_datas } from '../fixtures/user.fixture';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let repo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };
    service = new CreateUserService(repo);
  });

  it('should create a user and profile', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const profileName = faker.person.fullName();

    repo.findByEmail.mockResolvedValue(null);
    repo.save.mockImplementation(async (user: User) => user);

    const result = await service.execute({ email, password, profileName });

    expect(result.email).toBe(email);
    expect(result.profile.name).toBe(profileName);
    expect(repo.save).toHaveBeenCalled();
  });

  it('should throw if user already exists', async () => {
    repo.findByEmail.mockResolvedValue(new User());

    await expect(
      service.execute({
        email: user_email,
        password: faker.internet.password(),
        profileName: faker.person.fullName(),
      }),
    ).rejects.toThrow('User already exists');
  });

  // 잘못된 입력 케이스
  it.each(wrong_user_datas)(
    'should throw on invalid input: $reason',
    async ({ email, password, profileName }) => {
      repo.findByEmail.mockResolvedValue(null);

      await expect(
        service.execute({ email, password, profileName }),
      ).rejects.toThrow();
    },
  );
});
