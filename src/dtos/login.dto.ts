import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
