import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class YearformService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(userId: number, createYearformDto: Prisma.YearFormCreateInput) {
    
    return {
      data: await this.databaseService.yearForm.create({
          data: {...createYearformDto, user: {connect: {id: userId}}}
        }),
    };
  }

  async findMany(userId: number, startTimeString?: string, endTimeString?: string){
    return {
      data: await this.databaseService.yearForm.findMany({
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
    let formList = await this.databaseService.yearForm.findMany({
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
    return await this.databaseService.yearForm.delete({
      where:{
        id: id
      }
    })
  }
}
