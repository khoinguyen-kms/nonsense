import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { Tokens } from 'src/utils/types';
import { CreateUserDto } from 'src/dtos/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            registration: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    const mockLoginDto: LoginDto = {
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
    };
    const mockTokens: Tokens = {
      accessToken: 'TEST_ACCESS_TOKEN',
      refreshToken: 'TEST_REFRESH_TOKEN',
    };

    it('should return tokens on successful login', async () => {
      const mockResponse: BaseResponseDto<any> = new BaseResponseDto(
        HttpStatus.OK,
        'Signin successfully',
        mockTokens,
      );

      (authService.login as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authController.login(mockLoginDto);
      expect(result).toEqual(mockResponse);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      (authService.login as jest.Mock).mockRejectedValue(
        new UnauthorizedException(),
      );

      await expect(authController.login(mockLoginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('registration', () => {
    it('should return registered user details', async () => {
      const mockCreateUserDto: CreateUserDto = {
        username: 'TEST_USERNAME',
        firstName: '',
        lastName: '',
        password: '',
        email: 'test@test.com',
        confirm_password: 'TEST_PASSWORD',
      };
      const mockResponse: BaseResponseDto<any> = new BaseResponseDto(
        HttpStatus.OK,
        'Registration successfully',
        mockCreateUserDto,
      );

      (authService.registration as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authController.registration(mockCreateUserDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens on valid refresh token', async () => {
      const mockRefreshToken = 'TEST_REFRESH_TOKEN';
      const mockResponse: BaseResponseDto<Tokens> = new BaseResponseDto<Tokens>(
        HttpStatus.OK,
        '',
        { accessToken: 'TEST_ACCESS_TOKEN', refreshToken: mockRefreshToken },
      );

      (authService.refreshToken as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authController.refreshToken({
        refresh_token: mockRefreshToken,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw BadRequestException on invalid refresh token', async () => {
      const invalidRefreshToken = 'TEST_INVALID_REFRESH_TOKEN';
      (authService.refreshToken as jest.Mock).mockRejectedValue(
        new BadRequestException(),
      );

      await expect(
        authController.refreshToken({ refresh_token: invalidRefreshToken }),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
