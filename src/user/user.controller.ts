import { Body, Controller, Delete, Get, Header, HttpException, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { UserService } from './user.service'
import UserEntity, { IUser, SearchUser } from './user.entity'
import { StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'
import { AuthService } from '../auth/auth.service'
import * as argon2 from 'argon2'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() userData: { email: string; password: string }): Promise<StandardResponse<string>> {
    const password = await argon2.hash(userData.password)
    console.log('password >> ', password)
    const user = await this.authService.signIn(userData.email, userData.password)
    if (!user) {
      throw new HttpException({ user: 'not found' }, 401)
    }
    const token = this.authService.generateToken(user)
    const response = new StandardResponse<string>({ data: token })
    return Promise.resolve(response)
  }

  @Get('tokenRefresh') // @Headers('authorization') authorization: string
  async tokenRefresh(@Auth() user: IUser): Promise<StandardResponse<string>> {
    const token = this.authService.generateToken(user)
    const response = new StandardResponse<string>({ data: token })
    return Promise.resolve(response)
  }

  @Get()
  async findAll(@Query() query: SearchUser): Promise<StandardResponse<UserEntity>> {
    return await this.userService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param() params: SearchUser): Promise<StandardResponse<UserEntity>> {
    return await this.userService.findOne(params.id)
  }

  @Post()
  async create(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Body() academyData: UserEntity): Promise<UserEntity> {
    academyData.createdId = userId
    const result = await this.userService.create(academyData)
    return Promise.resolve(result)
  }

  @Patch(':id')
  async update(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Param() params: SearchUser, @Body() academyData: UserEntity): Promise<UserEntity> {
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
