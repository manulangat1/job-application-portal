import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from '../db/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
