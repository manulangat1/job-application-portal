import { Controller, Get, Logger } from '@nestjs/common';
import { HttpHealthIndicator } from '@nestjs/terminus';

@Controller('healthcheck')
export class HealthcheckController {
  private logger = new Logger('healthcheck');
  constructor(private http: HttpHealthIndicator) {}

  @Get('http')
  check() {
    this.logger.log('Fetching healthcheck status');
    return this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com');
  }
}
