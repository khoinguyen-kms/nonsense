import { Controller, Delete, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

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
