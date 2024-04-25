import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConsoleLogger } from '@nestjs/common';
import { HurtformService } from './hurtform.service';
import { Prisma } from '@prisma/client';
import { query } from 'express';

@Controller('hurtform')
export class HurtformController {
  constructor(private readonly hurtformService: HurtformService) {}

  @Post(':username')
  create(@Param('username') username: string, @Body() createHurtformDto: Prisma.HurtFormCreateInput) {
    return this.hurtformService.create(username, createHurtformDto);
  }

  @Get(':username')
  findUserForm(@Param('username') username: string, @Query('start') startTime?: string, @Query('end') endTime?: string) {
    return this.hurtformService.findMany(username, startTime, endTime);
  }

  @Get(':username/:num')
  findLast_K(@Param('username') username: string, @Param('num') k: number){
    return this.hurtformService.findLast_K(username, k);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hurtformService.remove(+id);
  }
}
