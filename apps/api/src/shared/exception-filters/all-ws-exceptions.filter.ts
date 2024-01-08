import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class AllWsExceptionsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(AllWsExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const callback = host.getArgByIndex(2);
    if (callback && typeof callback === 'function') {
      // TODO: Improve this ack
      callback({
        error: 'Internal server error',
      });
    }

    super.catch(exception, host);
  }
}
