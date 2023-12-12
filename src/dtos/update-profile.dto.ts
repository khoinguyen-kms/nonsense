import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate, IsDateString, IsOptional, IsPhoneNumber, IsString, MaxDate, MaxLength } from 'class-validator';
import { UserRole } from 'src/shared/enums/userRole.enum';

export class UpdateProfileDto {

  @ApiProperty({
    type: 'string',
    format: 'string',
    example: 'Abraham',
    required: false
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  firstName: string

  @ApiProperty({
    type: 'string',
    format: 'string',
    example: 'Gallagher',
    required: false
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  lastName: string

  @ApiProperty({
    type: 'string',
    format: 'string',
    example: 'Thu Duc District, HCMC',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  address: string

  @ApiProperty({
    type: 'string',
    format: 'string',
    example: '+84123456789',
    required: false
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string

  @ApiProperty({
    type: 'string',
    format: 'date',
    example: new Date(1999, 1, 1),
    required: false
  })
  @IsDate()
  @MaxDate(() => new Date(), {
    message: () => `maximal allowed date for date of birth is ${new Date().toDateString()}`
  })
  @IsOptional()
  dateOfBirth: Date

  @Exclude()
  username: string

  @Exclude()
  password: string

  @Exclude()
  roles: UserRole[]

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  @Exclude()
  deletedAt: Date
}
