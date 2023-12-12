import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from 'src/shared/enums/userRole.enum';

export class UpdateRoleDto {
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
