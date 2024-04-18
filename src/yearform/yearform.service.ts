import { Injectable } from '@nestjs/common';
import { CreateYearformDto } from './dto/create-yearform.dto';
import { UpdateYearformDto } from './dto/update-yearform.dto';

@Injectable()
export class YearformService {
  create(createYearformDto: CreateYearformDto) {
    return 'This action adds a new yearform';
  }

  findAll() {
    return `This action returns all yearform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} yearform`;
  }

  update(id: number, updateYearformDto: UpdateYearformDto) {
    return `This action updates a #${id} yearform`;
  }

  remove(id: number) {
    return `This action removes a #${id} yearform`;
  }
}
