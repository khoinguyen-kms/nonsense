import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { CreateUpdateClassDto } from 'src/dtos/create-update-class.dto';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { LectureClass } from 'src/entities/lecture-class.entity';
import { User } from 'src/entities/user.entity';
import { LectureClassesService } from 'src/lecture-classes/lecture-classes.service';
import { UserRole } from 'src/shared/enums/userRole.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UsersService,
    private readonly lectureService: LectureClassesService
  ) { }

  async getAllUsers(
    filter: PaginationDto,
  ): Promise<PaginationResponseDto<User>> {
    return await this.userService.getUsersWithDeleted(filter);
  }

  async deleteUser(id: number): Promise<BaseResponseDto<any>> {
    const isDeleted = await this.userService.removeUserSoftly(id);
    if (isDeleted) {
      return new BaseResponseDto<any>(
        HttpStatus.OK,
        'Delete user successfully',
        { deleted: true },
      );
    }

    throw new UnprocessableEntityException('User could not be deleted');
  }

  async updateRole(id: number, role: UserRole): Promise<BaseResponseDto<any>> {
    const check = await this.userService.updateRole(id, role);
    if (check)
      return new BaseResponseDto(HttpStatus.OK, 'Update role successfully', {
        updated: true,
      });
  }

  async getAllClassesWithDeleted(filter: PaginationDto): Promise<PaginationResponseDto<LectureClass[]>> {
    return await this.lectureService.fetchAllCurrentClasses(filter);
  }

  async createNewClass(inputs: CreateUpdateClassDto): Promise<BaseResponseDto<LectureClass>> {
    return await this.lectureService.createNewClass(inputs);
  }

  async updateClassInfo(id: number, inputs: CreateUpdateClassDto): Promise<BaseResponseDto<LectureClass | any>> {
    return await this.lectureService.updateClassInfo(id, inputs);
  }

  async addStudentsToClass(classId: number, userIds: number[]): Promise<BaseResponseDto<LectureClass>> {
    const updatedClass = await this.lectureService.addStudentToClass(classId, userIds);
    return new BaseResponseDto<LectureClass>(HttpStatus.OK, 'Add students successfully', updatedClass);
  }

  async removeClass(id: number): Promise<BaseResponseDto<any>> {
    const isDeleted = await this.lectureService.removeClass(id);
    if (isDeleted) return new BaseResponseDto(HttpStatus.OK, 'Delete class successfully', { deleted: true })
  }
}
