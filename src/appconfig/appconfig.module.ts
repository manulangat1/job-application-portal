import { Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppconfigService],
})
export class AppconfigModule {}
