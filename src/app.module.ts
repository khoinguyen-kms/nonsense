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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(mysqlConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ],
})
export class AppModule { }
