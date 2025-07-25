import { IsEnum, IsOptional, IsString } from 'class-validator';
import { JobApplicationStatus } from '../../common/enums/common-enums.dto';

export class DashboardQuery {
  @IsOptional()
  @IsEnum(JobApplicationStatus)
  status: JobApplicationStatus;

  @IsOptional()
  @IsString()
  search: string;
}
