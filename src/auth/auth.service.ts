import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService){}

    async login(loginUserDto){
        let user = await this.databaseService.user.findUnique({
            where:{
            username: loginUserDto['username'],
            }
        })
        if(!user){
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        let valid = await bcrypt.compare(loginUserDto['password'], user.password)
        if(!valid){
            throw new HttpException('password does not match', HttpStatus.UNAUTHORIZED);
        }
        return {
            success: true,
            message: 'login succeed'
        }
    }
}
