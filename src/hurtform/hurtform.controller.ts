import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConsoleLogger } from '@nestjs/common';
import { HurtformService } from './hurtform.service';
import { Prisma } from '@prisma/client';

@Controller('hurtform')
export class HurtformController {
  constructor(private readonly hurtformService: HurtformService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createHurtformDto: Prisma.HurtFormCreateInput) {
    return this.hurtformService.create(+userId, createHurtformDto);
  }

  @Get(':userId')
  findUserForm(@Param('userId') userId: string, @Query('start') startTime?: string, @Query('end') endTime?: string) {
    return this.hurtformService.findMany(+userId, startTime, endTime);
  }

  @Get(':userId/:num')
  findLast_K(@Param('userId') userId: string, @Param('num') k: number){
    return this.hurtformService.findLast_K(+userId, k);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hurtformService.remove(+id);
  }
}
