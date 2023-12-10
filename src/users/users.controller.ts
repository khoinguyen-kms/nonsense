import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async index() {
    return await this.userService.getUsers();
  }
}
