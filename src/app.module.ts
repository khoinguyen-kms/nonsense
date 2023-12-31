import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { mysqlConfig } from './configs/database.config';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/jwt.guard';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { RolesGuard } from './auth/roles.guard';
import { BullModule } from '@nestjs/bull';
import { LectureClassesController } from './lecture-classes/lecture-classes.controller';
import { LectureClassesService } from './lecture-classes/lecture-classes.service';
import { LectureClassesModule } from './lecture-classes/lecture-classes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(mysqlConfig),
    UsersModule,
    AuthModule,
    AdminModule,
    LectureClassesModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController, AuthController, AdminController, LectureClassesController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AdminService,
  ],
})
export class AppModule { }
