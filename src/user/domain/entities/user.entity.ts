import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  BaseEntity,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User extends BaseEntity {
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
}
