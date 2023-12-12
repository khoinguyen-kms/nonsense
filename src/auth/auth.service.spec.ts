import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { Tokens } from 'src/utils/types';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  const mockUser: User = new User();
  const mockTokens: Tokens = {
    accessToken: 'TEST_ACCESS_TOKEN',
    refreshToken: 'TEST_REFRESH_TOKEN',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            authentication: jest.fn(),
            createNewUser: jest.fn(),
            getUserBy: jest.fn(),
            updateRefreshToken: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    mockUser.id = 1;
    mockUser.username = 'TEST_USERNAME';
    mockUser.email = 'test@test.test';
    mockUser.password = 'TEST_PASSWORD';

    jest.spyOn(authService as any, 'generateTokens').mockImplementation(() => {
      return Promise.resolve(mockTokens);
    });
  });

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      (userService.authentication as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.login(
        mockUser.username,
        mockUser.password,
      );
      expect(authService['generateTokens']).toHaveBeenCalled();
      expect(result).toBeInstanceOf(BaseResponseDto);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      (userService.authentication as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login('invaliduser', 'invalidpassword'),
      ).rejects.toThrowError(new UnauthorizedException('Invalid credentials'));
      expect(authService['generateTokens']).not.toHaveBeenCalled();
    });
  });

  describe('registration', () => {
    it('should return registered user details', async () => {
      const mockUserDto: CreateUserDto = {
        username: mockUser.username,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        password: mockUser.password,
        confirm_password: mockUser.password,
      };
      (userService.createNewUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.registration(mockUserDto);
      expect(result).toEqual(
        new BaseResponseDto<User>(
          HttpStatus.OK,
          'Registration successfully',
          mockUser,
        ),
      );
    });
  });
});
