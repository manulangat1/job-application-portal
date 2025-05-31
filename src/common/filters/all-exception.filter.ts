import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { _500 } from '../error/error.messages';

// import { SentryExceptionCaptured } from '@sentry/nestjs';

/**
 * Avoid repeating yourself with multiple try {...} catch(e){...} : DRY🙅‍♂️
 * NOTE: You can use promise based catch handler to handle specific
 *       exceptions differently.
 *
 * Exception handle which catch any thrown error from the application and
 * return to the client
 * @param exception Thrown exception
 * @param host Argument host to access the application execution context
 * @returns error which will be caught and returned to the client
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  //   @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost): Response {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    console.log(exception);

    // if (exception['code'] === 'ENOENT') {
    //   return response.status(HttpStatus.NOT_FOUND).json(_404.FILE_NOT_FOUND);
    // }

    // Errors that will be handled and get thrown within the application
    if (exception instanceof HttpException) {
      //   const statusCode = exception.getStatus();
      const responseMsg = exception.getResponse();

      // Customize response for non-supported uploaded file size
      //   if (statusCode === HttpStatus.PAYLOAD_TOO_LARGE)
      //     return response
      //       .status(HttpStatus.BAD_REQUEST)
      //       .json(_400.UPLOADED_FILE_IS_TOO_LARGE);

      // Transform the exception error as the error code
      if (responseMsg['error']) {
        responseMsg['code'] = responseMsg['error']
          .split(' ')
          ?.join('_')
          ?.toUpperCase();
        delete responseMsg['error'];
      }

      // Error which returns message as an array, show each item independently
      // Generally these are the errors which will be thrown by the validation pipes
      if (responseMsg['message'] && Array.isArray(responseMsg['message'])) {
        responseMsg['message'] = responseMsg['message'][0];
      }

      delete responseMsg['statusCode'];
      return response.status(exception.getStatus()).json(responseMsg);
    }

    // Unhandled exceptions
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(_500.INTERNAL_SERVER_ERROR);
  }
}
