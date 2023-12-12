import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { UserRole } from 'src/shared/enums/userRole.enum';
import { UpdateRoleDto } from 'src/dtos/update-role.dto';
import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { User } from 'src/entities/user.entity';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            deleteUser: jest.fn(),
            getAllUsers: jest.fn(),
            updateRole: jest.fn(),
          },
        },
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const expectedResponse: BaseResponseDto<any> = new BaseResponseDto<any>(
        HttpStatus.OK,
        'Delete user successfully',
        { deleted: true },
      );

      (adminService.deleteUser as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const result = await adminController.deleteUser(userId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('fetchAllUsers', () => {
    it('should fetch all users', async () => {
      const query: PaginationDto = new PaginationDto();
      const expectedResponse: BaseResponseDto<User> = new BaseResponseDto<User>(
        HttpStatus.OK,
        '',
        [new User()],
      );

      (adminService.getAllUsers as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const result = await adminController.fetchAllUsers(query);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('updateUserRole', () => {
    it('should update user role', async () => {
      const userId = '1';
      const updateRoleDto: UpdateRoleDto = { role: UserRole.ADMIN };
      const expectedResponse: BaseResponseDto<any> = new BaseResponseDto<User>(
        HttpStatus.OK,
        '',
        new User(),
      );

      (adminService.updateRole as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const result = await adminController.updateUserRole(
        userId,
        updateRoleDto,
      );
      expect(result).toEqual(expectedResponse);
    });
  });
});
