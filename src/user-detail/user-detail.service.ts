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
  



  findAll() {
    return `This action returns all userDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDetail`;
  }

  update(id: number, updateUserDetailDto: Prisma.UserDetailUpdateInput) {
    return `This action updates a #${id} userDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDetail`;
  }
}
