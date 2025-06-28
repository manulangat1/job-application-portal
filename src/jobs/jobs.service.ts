import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from '../db/entities/job.entity';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { CreateJobApplicationDTO } from './dto/create-application';
import { okResponse, OkResponse } from '../common/dto/ok-response.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';
import { JobApplicationStatus } from '../common/enums/common-enums.dto';

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
      .orderBy('applications.createdAt', 'DESC')
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

  async update(
    id: number,
    user: User,
    data: UpdateApplicationDTO,
  ): Promise<OkResponse> {
    const { status, description, expectedSalary, currency } = data;
    const job = await this.jobRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!job) throw new BadRequestException('Job not found');

    if (status) {
      job.status = status;

      // clear out the description field if the status is not rejected.
      if (status !== JobApplicationStatus.REJECTED) {
        job.description = null;
      }
    }

    if (description) {
      job.description = description;
    }

    if (expectedSalary) {
      job.expectedSalary = expectedSalary;
    }

    if (currency) {
      job.currency = currency;
    }

    await this.jobRepository.save(job);

    return okResponse();
  }

  async delete(id: number, user: User): Promise<OkResponse> {
    const job = await this.jobRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    await this.jobRepository.softRemove(job);

    return okResponse();
  }
}
