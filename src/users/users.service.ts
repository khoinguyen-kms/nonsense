import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationService } from 'src/shared/services/pagination.service';
import { UpdateProfileDto } from 'src/dtos/update-profile.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { plainToClass } from 'class-transformer';
import { UserRole } from 'src/shared/enums/userRole.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly paginationService: PaginationService<User>,
  ) { }

  async createNewUser(inputs: CreateUserDto) {
    const { confirm_password, ...user } = inputs;
    const username = inputs.username;

    const isExisted = await this.isUserExistedBy({ username });
    if (isExisted)
      throw new BadRequestException(
        `User ${inputs.username} is already registerated.`,
      );

    if (confirm_password === user.password) {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }

    throw new BadRequestException(
      'Confirm password should be matched with the password',
    );
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async authentication(username: string, password: string): Promise<User> {
    const user = await this.findUserByUsername(username);
    if (!user) return null;

    const isCorrectPassword = await this.comparePassword(
      password,
      user?.password,
    );

    if (!isCorrectPassword)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({ where: { deletedAt: null } });
  }

  async getUserBy(filters: any): Promise<User | null> {
    return await this.userRepository.findOneBy(filters);
  }

  async getUsersWithDeleted(filter: PaginationDto) {
    return this.paginationService.paginate(this.userRepository, filter, true);
  }

  async removeUserSoftly(id: number): Promise<boolean> {
    const currentUser = await this.findUserById(id);
    currentUser.deletedAt = new Date();
    currentUser.isActive = false;

    return await this.updateSingleAttribute(currentUser);
  }

  async updateRefreshToken(
    id: number,
    newRefreshToken: string,
  ): Promise<boolean> {
    const currentUser = await this.findUserById(id);
    currentUser.refreshToken = newRefreshToken;

    return await this.updateSingleAttribute(currentUser);
  }

  async getUserProfile(id: number) {
    try {
      const data = await this.userRepository.findOne({ where: { id }, relations: { lectureClasses: true } })
      return { data }
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async updateUserProfile(
    id: number,
    inputs: UpdateProfileDto,
  ): Promise<BaseResponseDto<User | any>> {
    const user = await this.findUserById(id);
    if (Object.keys(inputs).length === 0 && inputs.constructor === Object) {
      return this.getDefaultResponse(HttpStatus.OK, 'Nothing happens');
    }

    const updatedData = plainToClass(UpdateProfileDto, inputs);
    Object.assign(user, updatedData);

    try {
      const updatedUser = await this.userRepository.save(user);
      return new BaseResponseDto(
        HttpStatus.OK,
        'Update profile successfully',
        updatedUser,
      );
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async updateRole(id: number, roleToUpdate: UserRole): Promise<boolean> {
    const user = await this.findUserById(id);
    user.roles = [roleToUpdate];
    return await this.updateSingleAttribute(user);
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return await this.userRepository.findBy({ id: In(ids) });
  }

  private async updateSingleAttribute(currentUser: User): Promise<boolean> {
    try {
      await this.userRepository.save(currentUser);
      return true;
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  private async comparePassword(
    passwod: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(passwod, storedPassword);
  }

  private getDefaultResponse(status: number, message: string) {
    return new BaseResponseDto(status, message, {});
  }

  private async findUserById(id: number): Promise<User> {
    const currentUser = await this.userRepository.findOneBy({ id });
    if (!currentUser || currentUser.deletedAt)
      throw new NotFoundException('User not found');

    return currentUser;
  }

  private async isUserExistedBy(
    where: FindOptionsWhere<User>,
  ): Promise<boolean> {
    return await this.userRepository.exist({ where });
  }
}
