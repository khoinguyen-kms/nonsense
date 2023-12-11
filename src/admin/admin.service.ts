import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UsersService) {}

  async getAllUsers(filter: PaginationDto): Promise<any> {
    return await this.userService.getUsersWithDeleted(filter);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userService.removeUserSoftly(id);
  }
}
