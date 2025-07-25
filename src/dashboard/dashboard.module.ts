import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from '../db/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
