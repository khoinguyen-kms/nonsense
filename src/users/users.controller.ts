import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/utils/decorators';
import { UpdateProfileDto } from 'src/dtos/update-profile.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { User } from 'src/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('users')
  @HttpCode(HttpStatus.OK)
  async index() {
    const users = await this.userService.getUsers();
    return { data: users };
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@CurrentUser() currentUser: any) {
    return await this.userService.getUserProfile(currentUser['sub']);
  }

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @CurrentUser() currentUser: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<BaseResponseDto<User | any>> {
    return this.userService.updateUserProfile(
      currentUser['sub'],
      updateProfileDto,
    );
  }
}
