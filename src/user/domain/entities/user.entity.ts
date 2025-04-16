import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Profile } from './profile.entity';
import { ModifyUserDto } from 'user/dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  static create(email: string, password: string, profileName: string): User {
    const profile = new Profile();
    profile.name = profileName;

    const user = new User();
    user.email = email;
    user.password = password;
    user.profile = profile;

    return user;
  }

  static modify(dto: ModifyUserDto): User {
    const profile = new Profile();

    profile.name = dto.profileName;

    const user = new User();
    user.id = dto.id;
    user.password = dto.password;
    user.profile = profile;

    return user;
  }
}
