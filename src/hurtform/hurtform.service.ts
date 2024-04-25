import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
/*
TODO
  findMany : Date validation
*/
@Injectable()
export class HurtformService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(userId: number, createHurtformDto: Prisma.HurtFormCreateInput) {
    
    return {
      data: await this.databaseService.hurtForm.create({
          data: {...createHurtformDto, user: {connect: {id: userId}}}
        }),
    };
  }

  async findMany(userId: number, startTimeString?: string, endTimeString?: string){
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

  async findLast_K(userId: number, k: number){
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
}
