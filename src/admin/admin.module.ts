import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [UsersModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule { }
