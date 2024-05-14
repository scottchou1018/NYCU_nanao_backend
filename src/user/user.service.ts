import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt'
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
    let valid = await bcrypt.compare(loginUserDto['password'], user.password)
    if(!valid){
      throw new HttpException('password does not match', HttpStatus.UNAUTHORIZED);
    }
    return {
      success: true,
      message: 'login succeed'
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
    if(this.databaseService.user.findUnique({
      where:{
        id: id,
      }
    }) == null){
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST)
    }
    let hashedUpdateUser = {
      ...updateUserDto,
      password: await bcrypt.hash(updateUserDto.password.toString(), 10)
    }
    return await this.databaseService.user.update({
      where:{
        id,
      },
      data: hashedUpdateUser,
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
