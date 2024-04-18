import { Injectable } from '@nestjs/common';
import { CreateWeekformDto } from './dto/create-weekform.dto';
import { UpdateWeekformDto } from './dto/update-weekform.dto';

@Injectable()
export class WeekformService {
  create(createWeekformDto: CreateWeekformDto) {
    return 'This action adds a new weekform';
  }

  findAll() {
    return `This action returns all weekform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weekform`;
  }

  update(id: number, updateWeekformDto: UpdateWeekformDto) {
    return `This action updates a #${id} weekform`;
  }

  remove(id: number) {
    return `This action removes a #${id} weekform`;
  }
}
