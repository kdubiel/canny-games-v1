import { Controller, Get, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';

@Controller('hello-world')
export class HelloWorldController {
  @UseGuards(TokenGuard)
  @Get()
  public helloWorld(): string {
    return 'Hello World!';
  }
}
