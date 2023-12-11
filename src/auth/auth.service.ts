import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JWT_REFRESH_SECRET_KEY } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) { }

  async login(username: string, password: string): Promise<any> {
    const currentUser = await this.userService.authentication(
      username,
      password,
    );
    if (!currentUser) throw new UnauthorizedException('Invalid credentials');

    const tokens = this.generateTokens(
      currentUser.id,
      currentUser.username,
      currentUser.roles,
    );
    return tokens;
  }

  async registration(inputs: CreateUserDto) {
    return this.userService.createNewUser(inputs);
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

  async generateTokens(
    sub: number,
    username: string,
    roles: string[],
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub, username, roles };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_SECRET_KEY,
      expiresIn: '7d',
    });

    await this.userService.updateRefreshToken(sub, refresh_token);

    return { access_token, refresh_token };
  }
}
