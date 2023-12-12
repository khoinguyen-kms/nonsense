import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenFieldToUserTable1702205711161
  implements MigrationInterface
{
  name = 'AddRefreshTokenFieldToUserTable1702205711161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`refreshToken\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refreshToken\``,
    );
  }
}
