import { UserRole } from 'src/shared/enums/userRole.enum';
import {
  BeforeInsert,
  Column,
  Entity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    default: [UserRole.USER],
    enum: UserRole,
    array: true,
  })
  roles: UserRole[];

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string

  @Column({ name: 'dob', type: 'date', nullable: true })
  dateOfBirth: Date

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean

  @Column({ type: 'varchar', nullable: true, name: 'phone_number' })
  phoneNumber: string

  @Column({ type: 'varchar', nullable: true })
  address: string

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: true, name: 'avatar_url' })
  avatarUrl: string

  @Column({ type: 'varchar', nullable: true, name: 'auth_stragety' })
  authStragety: string

  @Exclude()
  @Column({ type: 'varchar', nullable: true, default: null, name: 'refresh_token' })
  refreshToken: string;

  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
