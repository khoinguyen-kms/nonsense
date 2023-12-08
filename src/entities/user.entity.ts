import { UserRole } from "src/shared/enums/user_role.enum";
import { AfterUpdate, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', width: 20, unique: true })
  username: string

  @Column({ type: 'varchar', width: 20 })
  password: string

  @Column({
    type: 'enum',
    enum: UserRole, default: [UserRole.USER]
  })
  role: UserRole[]

  @Column({ nullable: true })
  authStragety: string

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @AfterUpdate()
  updateLastModifiedDate() {
    this.updatedAt = new Date();
  }
}
