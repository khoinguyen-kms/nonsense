import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) { }

  async login(username: string, password: string): Promise<any> {
    const currentUser = await this.userService.authentication(username, password);
    if (!currentUser) throw new UnauthorizedException()

    const payload = {
      sub: currentUser.id,
      username: currentUser.username
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async registration(inputs: CreateUserDto) {
    return this.userService.createNewUser(inputs);
  }

}
