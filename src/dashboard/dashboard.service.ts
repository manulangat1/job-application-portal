import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from '../db/entities/job.entity';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(JobApplication)
    private jobRepository: Repository<JobApplication>,
  ) {}

  async getAllJobs(user: User): Promise<any> {
    const jobs = await this.jobRepository
      .createQueryBuilder('jobs')
      .select('jobs.status, COUNT(jobs.id) as count')
      .groupBy('jobs.status')
      .where('jobs.user.id = :user', {
        user: user.id,
      })
      .getRawMany();
    return jobs;
  }
}
