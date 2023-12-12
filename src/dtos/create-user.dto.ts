import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  confirm_password: string;
}
