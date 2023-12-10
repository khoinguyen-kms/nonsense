import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createNewUser(inputs: CreateUserDto) {
    const { confirm_password, ...user } = inputs

    if (confirm_password === user.password) {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }

    throw new BadRequestException('Confirm password should be matched with the password');
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async authentication(username: string, password: string): Promise<User | null> {
    const user = await this.findUserByUsername(username);
    if (!user) return null;

    const isCorrectPassword = await this.comparePassword(password, user?.password);

    if (!isCorrectPassword) return null;

    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({ where: { deletedAt: null } });
  }

  async getUserBy(filters: {}): Promise<User | null> {
    return await this.userRepository.findOneBy(filters);
  }

  async getUsersWithDeleted() {
    return await this.userRepository.find({ withDeleted: true });
  }

  async removeUserSoftly(id: number): Promise<boolean> {
    const currentUser = await this.findUserById(id);
    currentUser.deletedAt = new Date();

    return await this.updateSingleAttribute(currentUser);
  }

  async updateRefreshToken(id: number, newRefreshToken: string): Promise<boolean> {
    const currentUser = await this.findUserById(id);
    currentUser.refreshToken = newRefreshToken;

    return await this.updateSingleAttribute(currentUser);
  }

  async updateSingleAttribute(currentUser: User): Promise<boolean> {
    const updated = await this.userRepository.save(currentUser);
    if (!updated) return false;

    return true;
  }

  async updateUser(id: number, inputs: UpdateUserDto): Promise<User | null> {
    const currentUser = await this.findUserById(id);


    await this.userRepository.save(currentUser);
    return null;
  }

  private async comparePassword(passwod: string, storedPassword: string) {
    return await bcrypt.compare(passwod, storedPassword);
  }

  private async findUserById(id: number): Promise<User> {
    const currentUser = await this.userRepository.findOne({ where: { id } });
    if (!currentUser || currentUser.deletedAt) throw new NotFoundException('User not found');

    return currentUser;
  }
}
