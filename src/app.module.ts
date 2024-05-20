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
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import configuration from 'config/configuration';

@Module({
  imports: [
    DatabaseModule, HurtformModule, YearformModule, WeekformModule, 
    UserModule, UserDetailModule, AuthModule,
    ConfigModule.forRoot({isGlobal:true, load:[configuration],}),
    PassportModule.register({
      session: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
