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
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { CreateUpdateClassDto } from 'src/dtos/create-update-class.dto';
import { LectureClass } from 'src/entities/lecture-class.entity';
import { AddStudentsClassDto } from 'src/dtos/add-students-class.dto';

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
  async fetchAllUsers(
    @Query() query: PaginationDto,
  ): Promise<PaginationResponseDto<User>> {
    return await this.adminService.getAllUsers(query);
  }

  @Roles(UserRole.ADMIN)
  @Post('users/:id/role')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUserRole(
    @Param('id') id: string,
    @Body() params: UpdateRoleDto,
  ): Promise<BaseResponseDto<any>> {
    return await this.adminService.updateRole(parseInt(id), params.role);
  }

  @Roles(UserRole.ADMIN)
  @Get('classes')
  @HttpCode(HttpStatus.OK)
  async fetchAllClasses(@Query() query: PaginationDto): Promise<PaginationResponseDto<LectureClass[]>> {
    return await this.adminService.getAllClassesWithDeleted(query);
  }

  @Roles(UserRole.ADMIN)
  @Post('classes')
  @HttpCode(HttpStatus.CREATED)
  async createNewClass(@Body() inputs: CreateUpdateClassDto): Promise<BaseResponseDto<LectureClass>> {
    return await this.adminService.createNewClass(inputs);
  }

  @Roles(UserRole.ADMIN)
  @Post('classes/:id')
  @HttpCode(HttpStatus.OK)
  async updateClassInfo(@Param('id') id: string, @Body() params: CreateUpdateClassDto): Promise<BaseResponseDto<LectureClass>> {
    return await this.updateClassInfo(id, params);
  }

  @Delete('classes/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  async deleteClass(@Param('id') id: string): Promise<BaseResponseDto<any>> {
    return await this.adminService.removeClass(parseInt(id));
  }

  @HttpCode(HttpStatus.OK)
  @Post('clasess/:id/users')
  @Roles(UserRole.ADMIN)
  async addUsersToClasses(@Param('id') id: string, @Body() inputs: AddStudentsClassDto): Promise<BaseResponseDto<LectureClass>> {
    return await this.adminService.addStudentsToClass(parseInt(id), inputs.studentIds);
  }
}
