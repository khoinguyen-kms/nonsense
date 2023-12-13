import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameJoinTable1702438614871 implements MigrationInterface {
    name = 'RenameJoinTable1702438614871'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
