import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JWT_REFRESH_SECRET_KEY } from 'src/utils/constants';
import { Tokens } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const currentUser = await this.userService.authentication(
      username,
      password,
    );
    if (!currentUser) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(
      currentUser.id,
      currentUser.username,
      currentUser.roles,
    );
    return new BaseResponseDto<Tokens>(
      HttpStatus.OK,
      'Signin successfully',
      tokens,
    );
  }

  async registration(inputs: CreateUserDto): Promise<BaseResponseDto<User>> {
    const createdUser = await this.userService.createNewUser(inputs);
    return new BaseResponseDto(
      HttpStatus.OK,
      'Registration successfully',
      createdUser,
    );
  }

  async refreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: JWT_REFRESH_SECRET_KEY,
      });
      const isExistedToken = await this.userService.getUserBy({
        username: verify.username,
        refreshToken,
      });
      if (isExistedToken) {
        return this.generateTokens(verify.sub, verify.username, verify.roles);
      } else {
        throw new BadRequestException('Refresh token is invalid');
      }
    } catch {
      throw new BadRequestException('Refresh token is invalid');
    }
  }

  private async generateTokens(
    sub: number,
    username: string,
    roles: string[],
  ): Promise<Tokens> {
    const payload = { sub, username, roles };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_SECRET_KEY,
      expiresIn: '7d',
    });

    await this.userService.updateRefreshToken(sub, refreshToken);

    return { accessToken, refreshToken };
  }
}
