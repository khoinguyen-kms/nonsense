import { UserRole } from "src/shared/enums/userRole.enum"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true })
  username: string

  @Column({ type: 'varchar', unique: true })
  password: string

  @Column({ type: 'enum', default: UserRole.USER, enum: UserRole })
  role: UserRole[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
