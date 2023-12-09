import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';

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

  private async comparePassword(passwod: string, storedPassword: string) {
    return await bcrypt.compare(passwod, storedPassword);
  }
}
