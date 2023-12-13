import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLectureClassesAndUsersRelationship1702438344650 implements MigrationInterface {
  name = 'AddLectureClassesAndUsersRelationship1702438344650'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users_lecture_classes_lecture_classes\` ADD CONSTRAINT \`FK_0783ef909482ed94d1c89e3bf99\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`users_lecture_classes_lecture_classes\` ADD CONSTRAINT \`FK_b76bc3ca06361229b6b23cea344\` FOREIGN KEY (\`lectureClassesId\`) REFERENCES \`lecture_classes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users_lecture_classes_lecture_classes\` DROP FOREIGN KEY \`FK_b76bc3ca06361229b6b23cea344\``);
    await queryRunner.query(`ALTER TABLE \`users_lecture_classes_lecture_classes\` DROP FOREIGN KEY \`FK_0783ef909482ed94d1c89e3bf99\``);
  }

}
