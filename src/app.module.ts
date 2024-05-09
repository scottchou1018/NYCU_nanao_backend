import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HurtformModule } from './hurtform/hurtform.module';
import { YearformModule } from './yearform/yearform.module';
import { WeekformModule } from './weekform/weekform.module';
import { UserModule } from './user/user.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, HurtformModule, YearformModule, WeekformModule, UserModule, UserDetailModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
