import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConsoleLogger, ParseIntPipe } from '@nestjs/common';
import { HurtformService } from './hurtform.service';
import { Prisma } from '@prisma/client';

@Controller('hurtform')
export class HurtformController {
  constructor(private readonly hurtformService: HurtformService) {}

  @Post(':userId')
  create(@Param('userId', ParseIntPipe) userId: number, @Body() createHurtformDto: Prisma.HurtFormCreateInput) {
    return this.hurtformService.create(userId, createHurtformDto);
  }

  @Get(':userId')
  findUserForm(@Param('userId', ParseIntPipe) userId: number, @Query('start') startTime?: string, @Query('end') endTime?: string) {
    return this.hurtformService.findMany(userId, startTime, endTime);
  }

  @Get(':userId/:num')
  findLast_K(@Param('userId', ParseIntPipe) userId: number, @Param('num', ParseIntPipe) k: number){
    return this.hurtformService.findLast_K(userId, k);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hurtformService.remove(id);
  }
}
