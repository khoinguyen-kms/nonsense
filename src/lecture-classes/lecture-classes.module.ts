import { Module } from '@nestjs/common';
import { LectureClassesService } from './lecture-classes.service';
import { LectureClassesController } from './lecture-classes.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureClass } from 'src/entities/lecture-class.entity';
import { PaginationModule } from 'src/shared/services/pagination.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([LectureClass]), ConfigModule, PaginationModule, UsersModule],
  providers: [LectureClassesService, ConfigModule],
  controllers: [LectureClassesController],
  exports: [LectureClassesService]
})
export class LectureClassesModule { }
