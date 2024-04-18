import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class HurtformService {
  create(createHurtformDto: Prisma.HurtFormCreateInput) {
    return 'This action adds a new hurtform';
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
