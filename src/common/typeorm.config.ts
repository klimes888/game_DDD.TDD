import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Player } from '../game/domain/entities/player.entity';
// import { Monster } from '../game/domain/entities/monster.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('DB_HOST') || 'localhost',
    port: +config.get<number>('DB_PORT') || 3306,
    username: config.get('MYSQL_USER'),
    password: config.get('MYSQL_PASSWORD'),
    database: config.get('MYSQL_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/**/migration/**/*.ts'],
    synchronize: true, // 개발 환경에서만 true로!
  }),
};
