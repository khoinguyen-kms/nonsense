import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRefreshTokenFieldToBeNullable1702205894942 implements MigrationInterface {
    name = 'ModifyRefreshTokenFieldToBeNullable1702205894942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NOT NULL`);
    }

}
