import { Module } from '@nestjs/common';
import { WeekformService } from './weekform.service';
import { WeekformController } from './weekform.controller';

@Module({
  controllers: [WeekformController],
  providers: [WeekformService],
})
export class WeekformModule {}
