import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from 'src/shared/enums/userRole.enum';

export class UpdateUserDto {
  @IsEnum(UserRole)
  role: string;
}
