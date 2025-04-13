import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Profile } from 'user/domain/entities/profile.entity';

import { User } from 'user/domain/entities/user.entity';
import { UserRepository } from 'user/domain/interfaces/user_repository.interface';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private userRepo: Repository<User>;
  private profileRepo: Repository<Profile>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(User);
    this.profileRepo = this.dataSource.getRepository(Profile);
  }

  async findByEmail(email: string): Promise<User | null> {
    const rawUser = await this.userRepo.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
    );

    return rawUser.length === 0 ? null : Object.assign(new User(), rawUser[0]); // plain text를 obj로 매핑
  }

  async findById(id: number): Promise<User | null> {
    const rawUser = await this.userRepo.query(
      'SELECT * FROM user WHERE id = ?',
      [id],
    );

    return Object.assign(new User(), rawUser[0]); // plain text를 obj로 매핑
  }

  /** 유저 저장 */
  async save(dto: User) {
    const result = await this.dataSource.transaction(async (manager) => {
      // 1. insertId 받아오기 (메타 정보)
      const profileInsertResult = await manager.query(
        'INSERT INTO profile (name) VALUES (?)',
        [dto.profile.name],
      );

      const profileId = profileInsertResult.insertId;

      // 2. 유저 삽입 + 프로필 ID 사용
      const userInsertResult = await manager.query(
        'INSERT INTO user (email, password, profileId) VALUES (?, ?, ?)',
        [dto.email, dto.password, profileId],
      );

      const userId = userInsertResult.insertId;

      return {
        id: userId,
        email: dto.email,
        profileName: dto.profile.name,
      };
    });

    return Object.assign(new User(), result);
  }
}
