import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AppconfigModule } from './appconfig/appconfig.module';

@Module({
  imports: [HealthcheckModule, AppconfigModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
