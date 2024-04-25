import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { channel } from 'diagnostics_channel';
import { connect } from 'http2';
import { start } from 'repl';
import { DatabaseService } from 'src/database/database.service';
/*
TODO
  findMany : Date validation
*/
@Injectable()
export class HurtformService {
  constructor(private readonly databaseService: DatabaseService){}

  // findLast_K
  async create(username: string, createHurtformDto: Prisma.HurtFormCreateInput) {
    let userId:number = await this.get_userId_from_username(username);
    return {
      data: await this.databaseService.hurtForm.create({
          data: {...createHurtformDto, user: {connect: {id: userId}}}
        }),
    };
  }

  async findMany(username: string, startTimeString?: string, endTimeString?: string){
    // throw new HttpException('Date parsing error', HttpStatus.BAD_REQUEST) 
    const userId = await this.get_userId_from_username(username)
    return {
      data: await this.databaseService.hurtForm.findMany({
        where: {
          user_id: userId,
          fill_time:{
            gte: startTimeString,
            lte: endTimeString
          }
        },
        orderBy: {
          'id': 'desc'
        }
      })
    }
  }

  async findLast_K(username: string, k: number){
    const userId = await this.get_userId_from_username(username)
    let formList = await this.databaseService.hurtForm.findMany({
      where:{
        user_id:userId
      },
      orderBy: {
        id: 'desc'
      }
    })
    return formList.slice(0, k < formList.length ? k : formList.length);
  }

  async remove(id: number) {
    return await this.databaseService.hurtForm.delete({
      where:{
        id: id
      }
    })
  }

  async get_userId_from_username(username: string){
    
    const user = await this.databaseService.user.findUnique({
      where: {
        username: username,
      }
    })

    if(!user)
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST)
    return user.id
  }
}
