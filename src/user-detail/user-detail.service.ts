import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserDetailService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(createUserDetailDto: Prisma.UserDetailCreateInput) {
    return this.databaseService.userDetail.create({
      data: createUserDetailDto
    })
  }

  async findAll(gender?: 'MALE' | 'FEMALE') {
    if (gender) return this.databaseService.userDetail.findMany({
      where:{
        gender,
      }
    })
    return this.databaseService.userDetail.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.userDetail.findUnique({
      where:{
        user_id: id,
      }
    });
  }

  async update(id: number, updateUserDetailDto: Prisma.UserDetailUpdateInput) {
    return this.databaseService.userDetail.update({
      where:{
        user_id: id,
      },
      data: updateUserDetailDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.userDetail.delete({
      where:{
        user_id: id,
      }
    });
  }
}
