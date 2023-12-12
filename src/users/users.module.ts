import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { PaginationModule } from 'src/shared/services/pagination.module';

@Module({
  imports: [ConfigModule, PaginationModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, ConfigModule, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
