import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { YearformService } from './yearform.service';
import { Prisma } from '@prisma/client';

@Controller('yearform')
export class YearformController {
  constructor(private readonly yearformService: YearformService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createYearformDto: Prisma.YearFormCreateInput) {
    return this.yearformService.create(+userId, createYearformDto);
  }

  @Get(':userId')
  findUserForm(@Param('userId') userId: string, @Query('start') startTime?: string, @Query('end') endTime?: string) {
    return this.yearformService.findMany(+userId, startTime, endTime);
  }

  @Get(':userId/:num')
  findLast_K(@Param('userId') userId: string, @Param('num') k: number){
    return this.yearformService.findLast_K(+userId, k);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearformService.remove(+id);
  }
}
