import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeekformService } from './weekform.service';
import { CreateWeekformDto } from './dto/create-weekform.dto';
import { UpdateWeekformDto } from './dto/update-weekform.dto';

@Controller('weekform')
export class WeekformController {
  constructor(private readonly weekformService: WeekformService) {}

  @Post()
  create(@Body() createWeekformDto: CreateWeekformDto) {
    return this.weekformService.create(createWeekformDto);
  }

  @Get()
  findAll() {
    return this.weekformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekformService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekformDto: UpdateWeekformDto) {
    return this.weekformService.update(+id, updateWeekformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekformService.remove(+id);
  }
}
