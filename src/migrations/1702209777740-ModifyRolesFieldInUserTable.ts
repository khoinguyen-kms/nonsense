import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRolesFieldInUserTable1702209777740 implements MigrationInterface {
    name = 'ModifyRolesFieldInUserTable1702209777740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`roles\` enum ('user', 'moderator', 'admin') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`role\` enum ('user', 'moderator', 'admin') NOT NULL DEFAULT 'user'`);
    }

}
