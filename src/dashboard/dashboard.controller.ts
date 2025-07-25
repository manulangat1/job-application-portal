import { Controller, Get, HttpCode } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../db/entities/user.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: "Load the dashboard API's",
  })
  @ApiResponse({
    status: 200,
    description: 'List of all job applications by user, grouped by the status',
  })
  async loadDashboard(@CurrentUser() user: User): Promise<any> {
    return this.dashboardService.getAllJobs(user);
  }
}
