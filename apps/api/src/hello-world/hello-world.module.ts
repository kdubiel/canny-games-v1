import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { HelloWorldController } from './hello-world.controller';

@Module({
  imports: [CommonModule],
  controllers: [HelloWorldController],
})
export class HelloWorldModule {}
