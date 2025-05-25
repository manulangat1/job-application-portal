import { Module } from '@nestjs/common';
import { LoginCounterService } from './login-counter.service';
import { LoginCounterController } from './login-counter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginCounter } from '../db/entities/login-counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginCounter])],
  controllers: [LoginCounterController],
  providers: [LoginCounterService],
  exports: [LoginCounterService],
})
export class LoginCounterModule {}
