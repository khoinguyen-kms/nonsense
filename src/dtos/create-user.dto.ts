import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  confirm_password: string;
}
