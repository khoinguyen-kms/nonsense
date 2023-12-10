import { UserRole } from "src/shared/enums/userRole.enum"
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true })
  username: string

  @Exclude()
  @Column({ type: 'varchar', unique: true })
  password: string

  @Column({ type: 'enum', default: UserRole.USER, enum: UserRole })
  role: UserRole[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
