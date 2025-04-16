import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}
