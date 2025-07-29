import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './dto/env.variables.dto';

@Injectable()
export class AppconfigService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get port(): string {
    return this.configService.getOrThrow('PORT');
  }

  get environment(): string {
    return this.configService.getOrThrow('NODE_ENV');
  }

  get clientPortal(): string {
    return this.configService.getOrThrow<string>('CLIENT_PORTAL_HOST_NAME');
  }

  get jwtSecretKey(): string {
    return this.configService.getOrThrow<string>('jwtSecretKey');
  }

  get jwtExpiresIn(): string {
    return this.configService.getOrThrow<string>('jwtExpiresIn');
  }
}
