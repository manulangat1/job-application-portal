import { IsEnum, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import {
  JobApplicationRejectionStatus,
  JobApplicationStatus,
} from '../../common/enums/common-enums.dto';

export class UpdateApplicationDTO {
  @IsNotEmpty()
  @IsEnum(JobApplicationStatus)
  status: JobApplicationStatus;

  @IsOptional()
  @ValidateIf((job) => job.status === JobApplicationStatus.REJECTED)
  @IsEnum(JobApplicationRejectionStatus)
  description: JobApplicationRejectionStatus | null;
}
