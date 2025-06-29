import { Global, Module } from '@nestjs/common';
import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { AppconfigService } from '../appconfig/appconfig.service';
import { Environment } from '../common/enums/common-enums.dto';

@Global()
@Module({
  imports: [
    LoggerPinoModule.forRootAsync({
      inject: [AppconfigService],
      useFactory: (configService: AppconfigService) => {
        const { environment } = configService;
        return {
          pinoHttp: {
            // enabled in production only.
            enabled: environment === Environment.production,
            serializers: {
              req: ({ headers, ...rest }): Record<string, any> => ({
                ...rest,
                'user-agent': headers?.['user-agent'],
              }),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              res: ({ headers, ...rest }): Record<string, any> => ({
                ...rest,
              }),
              response: (): undefined => undefined,
              err: (): undefined => undefined,
            },
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
