import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { User } from 'src/entities/user.entity';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { UserRole } from 'src/shared/enums/userRole.enum';

describe('AdminService', () => {
  let adminService: AdminService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: UsersService,
          useValue: {
            getUsersWithDeleted: jest.fn(),
            removeUserSoftly: jest.fn(),
            updateRole: jest.fn(),
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should return all users with pagination', async () => {
    const paginationDto: PaginationDto = new PaginationDto();
    const expectedResponse: PaginationResponseDto<User> =
      new PaginationResponseDto<any>(HttpStatus.OK, '', [new User()], {});

    (userService.getUsersWithDeleted as jest.Mock).mockResolvedValue(
      expectedResponse,
    );

    const result = await adminService.getAllUsers(paginationDto);
    expect(result).toEqual(expectedResponse);
  });

  it('should delete a user and return success response', async () => {
    const userId = 1;
    (userService.removeUserSoftly as jest.Mock).mockResolvedValue(true);

    const result = await adminService.deleteUser(userId);
    expect(result).toEqual(
      new BaseResponseDto<any>(HttpStatus.OK, 'Delete user successfully', {
        deleted: true,
      }),
    );
  });

  it('should throw UnprocessableEntityException when unable to delete user', async () => {
    const userId = 1;
    (userService.removeUserSoftly as jest.Mock).mockResolvedValue(false);

    await expect(adminService.deleteUser(userId)).rejects.toThrowError(
      new UnprocessableEntityException('User could not be deleted'),
    );
  });

  it('should update user role and return success response', async () => {
    const userId = 1;
    const userRole: UserRole = UserRole.ADMIN;
    (userService.updateRole as jest.Mock).mockResolvedValue(true);

    const result = await adminService.updateRole(userId, userRole);
    expect(result).toEqual(
      new BaseResponseDto<any>(HttpStatus.OK, 'Update role successfully', {
        updated: true,
      }),
    );
  });
});
