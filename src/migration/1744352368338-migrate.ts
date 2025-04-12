import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1744352368338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE profile (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            INDEX (name)
        )
        `);

    queryRunner.query(`
        CREATE TABLE user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            deletedAt DATETIME DEFAULT NULL,
            profileId INT,
            INDEX (email),
            CONSTRAINT FK_profile FOREIGN KEY (profileId) REFERENCES profile(id)
        )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE user`);
    queryRunner.query(`DROP TABLE profile`);
  }
}
