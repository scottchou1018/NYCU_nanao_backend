import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException,HttpStatus } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { Prisma } from '@prisma/client';

@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Post()
  create(@Body() createUserDetailDto: Prisma.UserDetailCreateInput) {
    return this.userDetailService.create(createUserDetailDto);
  }

  

  @Get()
  findAll() {
    return this.userDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDetailDto: Prisma.UserDetailUpdateInput) {
    return this.userDetailService.update(+id, updateUserDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailService.remove(+id);
  }
}
