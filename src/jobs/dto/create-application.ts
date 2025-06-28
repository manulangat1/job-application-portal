import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateJobApplicationDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  expectedSalary: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dateApplied: string;
}
