import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: "superadmin" })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "password" })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
