import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../db/entities/user.entity';
import { CreateJobApplicationDTO } from './dto/create-application';
import { OkResponse } from '../common/dto/ok-response.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all job applications made by a user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all job applications',
  })
  getJobApplicationsByUser(@CurrentUser() user: User): Promise<any> {
    return this.jobsService.getJobApplicationsByUser(user);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new job application',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
  })
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateJobApplicationDTO,
  ): Promise<OkResponse> {
    return this.jobsService.create(dto, user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a job application by ID',
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: User,
    @Body() data: UpdateApplicationDTO,
  ): Promise<OkResponse> {
    return this.jobsService.update(id, user, data);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a job application by ID',
  })
  async deleteById(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: User,
  ): Promise<OkResponse> {
    return this.jobsService.delete(id, user);
  }
}
