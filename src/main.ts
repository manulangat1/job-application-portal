import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppconfigService } from './appconfig/appconfig.service';
import { Environment } from './common/enums/common-enums.dto';
import {
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_DOCUMENTATION_PATH } from './common/constants/general.constants';
import { getLogLevels } from './common/utils';
import { isIn } from 'class-validator';
import { _401 } from './common/error/error.messages';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, environment } = app.get(AppconfigService);

  const isProductionEnvironment = environment === Environment.production;

  // TODO: come and enable the global logger.

  app.useLogger(getLogLevels(isProductionEnvironment));

  app.setGlobalPrefix('api', {});
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.use(helmet());

  if (!isProductionEnvironment) enableOpenApiDocumentation(app, '1');
  // allowed clients

  const { clientPortal } = app.get(AppconfigService);

  const allowedClientApplicationsOrigin: string[] = [clientPortal];

  app.enableCors({
    origin: (origin, callback): void => {
      if (!origin || isIn(origin, allowedClientApplicationsOrigin))
        callback(null, origin || clientPortal);
      else callback(new UnauthorizedException(_401.ORIGIN_NOT_SUPPORTED));
    },
  });

  await app.listen(port);
}
bootstrap();

const enableOpenApiDocumentation = (
  app: INestApplication,
  version: string,
): void => {
  const config = new DocumentBuilder()
    .setTitle('Jozy web application')
    .setDescription('Set of APIs of Jozy platform')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      // PaginatedDto, PaginationMeta, PaymentChannelResponseDto
    ],
  });

  SwaggerModule.setup(SWAGGER_DOCUMENTATION_PATH, app, document);
};
