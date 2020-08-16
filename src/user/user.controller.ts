import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import UserEntity, { SearchUser } from './user.entity'
import { StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: SearchUser): Promise<StandardResponse<UserEntity>> {
    return await this.userService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param() params: SearchUser): Promise<StandardResponse<UserEntity>> {
    return await this.userService.findOne(params.id)
  }

  @Post()
  async create(@Auth('id') userId: number, @Body('data') academyData: UserEntity): Promise<UserEntity> {
    academyData.createdId = userId
    const result = await this.userService.create(academyData)
    return Promise.resolve(result)
  }

  @Patch(':id')
  async update(@Auth('id') userId: number, @Param() params: SearchUser, @Body('data') academyData: UserEntity): Promise<UserEntity> {
    academyData.updatedId = userId
    const result = await this.userService.update(params.id, academyData)
    return Promise.resolve(result)
  }

  @Delete(':id')
  async delete(@Param() params: SearchUser): Promise<UserEntity> {
    const result = await this.userService.delete(params.id)
    return Promise.resolve(result)
  }
}
