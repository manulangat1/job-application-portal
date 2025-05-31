import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { LoginCounterModule } from '../login-counter/login-counter.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoginCounterModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
