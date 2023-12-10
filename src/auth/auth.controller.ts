import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { PublicRoute } from 'src/utils/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

  @ApiBearerAuth()
  @PublicRoute()
  @Post('refresh_token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() { refresh_token }) {
    return await this.authService.refreshToken(refresh_token);
  }
}
