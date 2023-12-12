import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/shared/enums/userRole.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UsersService) { }

  async getAllUsers(filter: PaginationDto): Promise<PaginationResponseDto<User>> {
    return await this.userService.getUsersWithDeleted(filter);
  }

  async deleteUser(id: number): Promise<BaseResponseDto<any>> {
    const isDeleted = await this.userService.removeUserSoftly(id);
    if (isDeleted) {
      return new BaseResponseDto<any>(HttpStatus.OK, 'Delete user successfully', { deleted: true });
    }

    throw new UnprocessableEntityException('User could not be deleted');
  }

  async updateRole(id: number, role: UserRole): Promise<BaseResponseDto<any>> {
    const check = await this.userService.updateRole(id, role);
    if (check) return new BaseResponseDto(HttpStatus.OK, 'Update role successfully', { updated: true })
  }

  async bulkDelete() {

  }

}
