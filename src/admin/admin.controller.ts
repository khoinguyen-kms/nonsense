import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/utils/decorators';
import { UserRole } from 'src/shared/enums/userRole.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { UpdateRoleDto } from 'src/dtos/update-role.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { User } from 'src/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<BaseResponseDto<any>> {
    return await this.adminService.deleteUser(parseInt(id));
  }

  @Roles(UserRole.ADMIN)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async fetchAllUsers(@Query() query: PaginationDto): Promise<BaseResponseDto<User>> {
    return await this.adminService.getAllUsers(query);
  }

  @Roles(UserRole.ADMIN)
  @Post('users/:id/role')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUserRole(@Param('id') id: string, @Body() params: UpdateRoleDto): Promise<BaseResponseDto<any>> {
    return await this.adminService.updateRole(parseInt(id), params.role);
  }
}
