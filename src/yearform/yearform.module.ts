import { Module } from '@nestjs/common';
import { YearformService } from './yearform.service';
import { YearformController } from './yearform.controller';

@Module({
  controllers: [YearformController],
  providers: [YearformService],
})
export class YearformModule {}
