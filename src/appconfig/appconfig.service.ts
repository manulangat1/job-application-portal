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

  // allowedClientURLS = {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   client: this.configService.getOrThrow('CLIENT_PORTAL_HOST_NAME'),
  // };
}
