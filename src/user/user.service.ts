import { Injectable, HttpException, HttpStatus, ConflictException, BadRequestException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(createUserDto: Prisma.UserCreateInput) {
    try{
      return await this.databaseService.user.create({
        data: createUserDto,
      })
    } catch(error){
      if (error.message.includes('Unique constraint')) {
        throw new ConflictException('username already exists');
      } else if((error.message.includes('Argument') && error.message.includes('is missing')) || (error.message.includes('Unknown argument'))){
        throw new BadRequestException('bad request, json format is incorrect')
      } else {
        throw error;
      }
    }
  }

  async login(body: {username: string, password: string}){
    try{
      const user = await this.findOne(await this.findId(body.username))
      if (user){
        if (user.password!=body.password){
          throw new UnauthorizedException('Incorrect password');
        }
        return user.password==body.password;
      }
    } catch(error){
      throw error;
    }
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where:{
        id,
      }
    })
    if (!user){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    try{
      const user = await this.findOne(id)
      return await this.databaseService.user.update({
        where:{
          id,
        },
        data: updateUserDto,
      });
    } catch(error){
      if (error.message.includes('Unique constraint')) {
        throw new ConflictException('username already exists')
      } else if(error.message.includes('Unknown argument')){
        throw new BadRequestException('bad request, unknown labels is included')
      } else {
        throw error;
      }
    } 
  }

  async remove(id: number) {
    try{
      const user = await this.findOne(id)
      return await this.databaseService.user.delete({
        where:{
          id,
        }
      });
    } catch(error){
      throw error;
    }
    
  }

  async findId(UserName: string){
    const user = await this.databaseService.user.findUnique({
      where: {
        username: UserName,
      }
    })

    if(!user)
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST)
    return user.id
  }
}
