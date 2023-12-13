import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigrationsForEntities1702461004953 implements MigrationInterface {
    name = 'InitMigrationsForEntities1702461004953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` enum ('user', 'moderator', 'admin') NOT NULL DEFAULT 'user', \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`dob\` date NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`avatar_url\` varchar(255) NULL, \`auth_stragety\` varchar(255) NULL, \`refresh_token\` varchar(255) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lecture_classes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`class_name\` varchar(255) NOT NULL, \`available_amount\` int NOT NULL DEFAULT '150', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students_with_classes\` (\`usersId\` int NOT NULL, \`lectureClassesId\` int NOT NULL, INDEX \`IDX_85eb67c58917bd1889703733ea\` (\`usersId\`), INDEX \`IDX_c30a275bed586728e2c3a58dcb\` (\`lectureClassesId\`), PRIMARY KEY (\`usersId\`, \`lectureClassesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students_with_classes\` ADD CONSTRAINT \`FK_85eb67c58917bd1889703733ea5\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`students_with_classes\` ADD CONSTRAINT \`FK_c30a275bed586728e2c3a58dcb9\` FOREIGN KEY (\`lectureClassesId\`) REFERENCES \`lecture_classes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students_with_classes\` DROP FOREIGN KEY \`FK_c30a275bed586728e2c3a58dcb9\``);
        await queryRunner.query(`ALTER TABLE \`students_with_classes\` DROP FOREIGN KEY \`FK_85eb67c58917bd1889703733ea5\``);
        await queryRunner.query(`DROP INDEX \`IDX_c30a275bed586728e2c3a58dcb\` ON \`students_with_classes\``);
        await queryRunner.query(`DROP INDEX \`IDX_85eb67c58917bd1889703733ea\` ON \`students_with_classes\``);
        await queryRunner.query(`DROP TABLE \`students_with_classes\``);
        await queryRunner.query(`DROP TABLE \`lecture_classes\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
