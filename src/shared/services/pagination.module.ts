import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PaginationService } from './pagination.service';
import { UserRepository } from 'src/users/user.repository';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [PaginationService, Repository<User>],
  exports: [PaginationService],
})
export class PaginationModule {}
