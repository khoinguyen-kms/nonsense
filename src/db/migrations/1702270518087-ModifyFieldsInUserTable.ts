import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyFieldsInUserTable1702270518087
  implements MigrationInterface
{
  name = 'ModifyFieldsInUserTable1702270518087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`avatarUrl\` \`avatarUrl\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`authStragety\` \`authStragety\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`authStragety\` \`authStragety\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`avatarUrl\` \`avatarUrl\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL`,
    );
  }
}
