import { IsEnum, IsNotEmpty } from 'class-validator';
import { JobApplicationStatus } from '../../common/enums/common-enums.dto';

export class UpdateApplicationDTO {
  @IsNotEmpty()
  @IsEnum(JobApplicationStatus)
  status: JobApplicationStatus;
}
