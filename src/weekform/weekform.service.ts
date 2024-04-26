import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WeekformService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(userId: number, createWeekformDto: Prisma.WeekFormCreateInput) {
    return {
      data: await this.databaseService.weekForm.create({
          data: {...createWeekformDto, user: {connect: {id: userId}}}
        }),
    };
  }

  async findMany(userId: number, startTimeString?: string, endTimeString?: string){
    return {
      data: await this.databaseService.weekForm.findMany({
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
    let formList = await this.databaseService.weekForm.findMany({
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
    return await this.databaseService.weekForm.delete({
      where:{
        id: id
      }
    })
  }
}
