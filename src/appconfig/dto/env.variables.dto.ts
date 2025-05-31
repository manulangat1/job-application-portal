import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Environment } from '../../common/enums/common-enums.dto';

@Exclude()
export class EnvironmentVariables {
  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @Expose()
  @IsUrl()
  @IsNotEmpty()
  CLIENT_PORTAL_HOST_NAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  jwtSecretKey: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  jwtExpiresIn: string;
}
