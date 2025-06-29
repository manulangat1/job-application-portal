import { Global, Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Global()
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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('jwtSecretKey'),
        signOptions: { expiresIn: configService.getOrThrow('jwtExpiresIn') },
      }),
    }),
  ],
  providers: [AppconfigService],
  exports: [JwtModule, AppconfigService],
})
export class AppconfigModule {}
