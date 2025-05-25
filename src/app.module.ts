import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AppconfigModule } from './appconfig/appconfig.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthcheckModule, AppconfigModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
