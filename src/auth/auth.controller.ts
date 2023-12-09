import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Version } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
