import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LectureClassesModule } from 'src/lecture-classes/lecture-classes.module';

@Module({
  imports: [UsersModule, LectureClassesModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
