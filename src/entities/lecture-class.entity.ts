import { MAXIMUM_AVAILABLE_STUDENTS_IN_CLASS } from "src/utils/constants";
import { AbstractEntity } from "./abstract.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany } from "typeorm";
import { User } from "./user.entity";
import { UnprocessableEntityException } from "@nestjs/common";

@Entity({ name: 'lecture_classes' })
export class LectureClass extends AbstractEntity {

  @Column({ type: 'varchar', name: 'class_name' })
  className: string

  @Column({ name: 'available_amount', default: MAXIMUM_AVAILABLE_STUDENTS_IN_CLASS })
  availableAmount: number

  @ManyToMany(() => User, (student) => student.lectureClasses)
  students: User[]

  @BeforeUpdate()
  @BeforeInsert()
  private checkValidAmout() {
    if (this.availableAmount > MAXIMUM_AVAILABLE_STUDENTS_IN_CLASS || this.availableAmount < 0) {
      throw new UnprocessableEntityException(`Maximum amount for this class is: ${MAXIMUM_AVAILABLE_STUDENTS_IN_CLASS} and could not be negative`)
    }
  }
}
