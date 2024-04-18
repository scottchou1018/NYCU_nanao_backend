import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HurtformService } from './hurtform.service';
import { Prisma } from '@prisma/client';

@Controller('hurtform')
export class HurtformController {
  constructor(private readonly hurtformService: HurtformService) {}

  @Post()
  create(@Body() createHurtformDto: Prisma.HurtFormCreateInput) {
    return this.hurtformService.create(createHurtformDto);
  }

  @Get()
  findAll() {
    return this.hurtformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hurtformService.findOne(+id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHurtformDto: Prisma.HurtFormUpdateInput) {
    return this.hurtformService.update(+id, updateHurtformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hurtformService.remove(+id);
  }
}
