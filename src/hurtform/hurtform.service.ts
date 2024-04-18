import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HurtformService {
  constructor(private readonly databaseService: DatabaseService){}
  create(id: number, createHurtformDto: Prisma.HurtFormCreateInput) {
    return this.databaseService.hurtForm.create({
      data: {...createHurtformDto, user: {connect: {id: id}}}
    });
  }

  findAll() {
    return `This action returns all hurtform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hurtform`;
  }

  update(id: number, updateHurtformDto: Prisma.HurtFormUpdateInput) {
    return `This action updates a #${id} hurtform`;
  }

  remove(id: number) {
    return `This action removes a #${id} hurtform`;
  }
}
