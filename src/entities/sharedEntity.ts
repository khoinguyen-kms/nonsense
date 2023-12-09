import { BaseEntity } from "typeorm";
import { AfterUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export class SharedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date

  @AfterUpdate()
  updateLastModifiedDate() {
    this.updatedAt = new Date();
  }
}
