import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
  modify(user: User): Promise<void>;
}
