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
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core'
@Module({
  imports: [
    DatabaseModule, 
    HurtformModule, 
    YearformModule, 
    WeekformModule, 
    UserModule, 
    UserDetailModule, 
    ConfigModule.forRoot(), 
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,
      limit: 3,
    },{
      name: 'long',
      ttl: 60000,
      limit: 100,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
