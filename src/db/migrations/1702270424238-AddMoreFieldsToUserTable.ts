import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoreFieldsToUserTable1702270424238
  implements MigrationInterface
{
  name = 'AddMoreFieldsToUserTable1702270424238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`dob\` date NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isActive\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`address\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`avatarUrl\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`authStragety\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`authStragety\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatarUrl\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`address\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isActive\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dob\``);
  }
}
