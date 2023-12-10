import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Version } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { PublicRoute } from 'src/utils/decorators';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @PublicRoute()
  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
