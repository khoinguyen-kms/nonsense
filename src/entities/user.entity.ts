import { AfterUpdate, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserRole } from "src/shared/enums/userRole.enum";
import { SharedEntity } from "./sharedEntity";

@Entity({ name: 'users' })
export class User extends SharedEntity {
  @Column({ type: 'varchar', width: 20, unique: true })
  username: string

  @Column({ type: 'varchar', width: 20 })
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: [UserRole.USER],
  })
  role: UserRole[]

  @Column({ nullable: true })
  authStragety: string


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
