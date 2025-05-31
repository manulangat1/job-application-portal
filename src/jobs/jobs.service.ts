import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from '../db/entities/job.entity';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { CreateJobApplicationDTO } from './dto/create-application';
import { okResponse, OkResponse } from '../common/dto/ok-response.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobApplication)
    private jobRepository: Repository<JobApplication>,
  ) {}

  async getJobApplicationsByUser(user: User): Promise<any> {
    const applications = await this.jobRepository
      .createQueryBuilder('applications')
      .where('applications.userId = :userId', {
        userId: user.id,
      })
      .getMany();

    return applications;
  }

  async create(dto: CreateJobApplicationDTO, user: User): Promise<OkResponse> {
    const job = this.jobRepository.create({
      ...dto,
      user,
      appliedDate: new Date(),
    });

    await this.jobRepository.save(job);

    return okResponse();
  }
}
