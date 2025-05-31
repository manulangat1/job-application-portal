import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  expectedSalary: string;

  //   @ApiProperty()
  //   @IsString()
  //   @IsNotEmpty()
  //   name: string;
}
