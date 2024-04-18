import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YearformService } from './yearform.service';
import { CreateYearformDto } from './dto/create-yearform.dto';
import { UpdateYearformDto } from './dto/update-yearform.dto';

@Controller('yearform')
export class YearformController {
  constructor(private readonly yearformService: YearformService) {}

  @Post()
  create(@Body() createYearformDto: CreateYearformDto) {
    return this.yearformService.create(createYearformDto);
  }

  @Get()
  findAll() {
    return this.yearformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yearformService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYearformDto: UpdateYearformDto) {
    return this.yearformService.update(+id, updateYearformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearformService.remove(+id);
  }
}
