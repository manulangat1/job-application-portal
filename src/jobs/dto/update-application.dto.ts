import { IsEnum, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import {
  Currency,
  JobApplicationRejectionStatus,
  JobApplicationStatus,
} from '../../common/enums/common-enums.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(JobApplicationStatus)
  status: JobApplicationStatus;

  @IsOptional()
  @ApiPropertyOptional()
  @ValidateIf((job) => job.status === JobApplicationStatus.REJECTED)
  @IsEnum(JobApplicationRejectionStatus)
  description: JobApplicationRejectionStatus | null;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  expectedSalary: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Currency)
  currency: Currency;
}
