import { Module } from '@nestjs/common';

import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AppconfigModule } from './appconfig/appconfig.module';
import { AuthModule } from './auth/auth.module';
import { LoginCounterModule } from './login-counter/login-counter.module';
import { JobsModule } from './jobs/jobs.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/JwtAuthGuard';
import { ProfileModule } from './profile/profile.module';
// import { LoggerModule } from 'nestjs-pino';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    // LoggerModule.forRoot(),
    HealthcheckModule,
    AppconfigModule,
    AuthModule,
    LoginCounterModule,
    JobsModule,
    ProfileModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
