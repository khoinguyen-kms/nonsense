import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/utils/decorators';
import { UserRole } from 'src/shared/enums/userRole.enum';

@Controller('admin')
export class AdminController {

  constructor(private readonly adminService: AdminService) { }

  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    await this.adminService.deleteUser(parseInt(id));
    return { message: 'User is deleted successfully' }
  }

  @Roles(UserRole.ADMIN)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async fetchAllUsers() {
    const users = await this.adminService.getAllUsers();
    return { data: users }
  }
}
