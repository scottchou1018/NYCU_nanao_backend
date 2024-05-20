import { Body, Controller, Get, Inject, Post, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminOrSameUserIdGuard, LocalAuthGuard } from './utils/guards/LocalGuard';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(){
        
    }

    @UseGuards(AdminOrSameUserIdGuard)
    @Get('status')
    getAuthStatus(@Body() body, @Session() session){
        return session
    }
}
