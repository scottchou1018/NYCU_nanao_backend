import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt'
import { hasSubscribers } from 'diagnostics_channel';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(createUserDto: Prisma.UserCreateInput) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.databaseService.user.create({
      data: createUserDto,
    })
  }

  async login(loginUserDto){
    let hashedPassword:string = await bcrypt.hash(loginUserDto['password'], 10);
    let user = await this.databaseService.user.findUnique({
      where:{
        username: loginUserDto['username'],
      }
    })
    if(!user){
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    if(await bcrypt.compare(hashedPassword, user.password)){
      throw new HttpException('password do not match', HttpStatus.UNAUTHORIZED);
    }
    return {
      success: true,
      message: 'login succeeded',
    }
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where:{
        id,
      }
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where:{
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where:{
        id,
      }
    });
  }

  async findId(UserName: string){
    const user = await this.databaseService.user.findUnique({
      where: {
        username: UserName,
      }
    })

    if(!user)
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST)
    return user.id
  }
}
