// import { UserRepository } from '../../domain/interfaces/user_repository.interface';

export const userMockRepo = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  modify: jest.fn(),
};
