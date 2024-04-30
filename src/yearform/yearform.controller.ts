import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { YearformService } from './yearform.service';
import { Prisma } from '@prisma/client';

@Controller('yearform')
export class YearformController {
  constructor(private readonly yearformService: YearformService) {}

  @Post(':userId')
  create(@Param('userId', ParseIntPipe) userId: number, @Body() createYearformDto: Prisma.YearFormCreateInput) {
    return this.yearformService.create(userId, createYearformDto);
  }

  @Get(':userId')
  findUserForm(@Param('userId', ParseIntPipe) userId: number, @Query('start') startTime?: string, @Query('end') endTime?: string) {
    return this.yearformService.findMany(userId, startTime, endTime);
  }

  @Get(':userId/:num')
  findLast_K(@Param('userId', ParseIntPipe) userId: number, @Param('num', ParseIntPipe) k: number){
    return this.yearformService.findLast_K(userId, k);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.yearformService.remove(id);
  }
}
