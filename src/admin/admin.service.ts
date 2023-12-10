import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UsersService
  ) { }

  async getAllUsers(): Promise<User[]> {
    return await this.userService.getUsersWithDeleted();
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userService.removeUserSoftly(id);
  }
}
