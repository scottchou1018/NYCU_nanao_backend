import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WeekformService } from './weekform.service';
import { Prisma } from '@prisma/client';
@Controller('weekform')
export class WeekformController {
  constructor(private readonly weekformService: WeekformService) {}
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createWeekformDto: Prisma.WeekFormCreateInput) {
    return this.weekformService.create(+userId, createWeekformDto);
  }

  @Get(':userId')
  findUserForm(@Param('userId') userId: string, @Query('start') startTime?: string, @Query('end') endTime?: string) {
    return this.weekformService.findMany(+userId, startTime, endTime);
  }

  @Get(':userId/:num')
  findLast_K(@Param('userId') userId: string, @Param('num') k: number){
    return this.weekformService.findLast_K(+userId, k);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekformService.remove(+id);
  }
}
