import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetWsUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);
