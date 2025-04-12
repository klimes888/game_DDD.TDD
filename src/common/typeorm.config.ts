import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../user/domain/entities/user.entity';
import { Profile } from '../user/domain/entities/profile.entity';

dotenv.config(); // .env 파일 읽기

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Profile], // 또는 [__dirname + '/../**/*.entity.{ts,js}']
  migrations: [__dirname + '/../migration/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
});
