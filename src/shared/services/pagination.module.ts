import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PaginationService } from './pagination.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [PaginationService, Repository<User>],
  exports: [PaginationService],
})
export class PaginationModule {}
