import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnUserTable1702275422385 implements MigrationInterface {
  name = 'RenameColumnUserTable1702275422385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refreshToken\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isActive\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatarUrl\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`authStragety\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`first_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`last_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`phone_number\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`avatar_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`auth_stragety\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`refresh_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deleted_at\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refresh_token\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`auth_stragety\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar_url\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`phone_number\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_active\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_name\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`first_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`authStragety\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`avatarUrl\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`refreshToken\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
