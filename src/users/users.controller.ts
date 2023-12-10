import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async index() {
    const users = await this.userService.getUsers();
    return { data: users };
  }
}
