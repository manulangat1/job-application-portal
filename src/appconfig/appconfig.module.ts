import { Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const config = configService.get('typeorm');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return config;
      },
    }),
  ],
  providers: [AppconfigService],
})
export class AppconfigModule {}
