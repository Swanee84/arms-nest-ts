import { Body, Controller, Delete, Get, Header, HttpException, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common'
import { UserService } from './user.service'
import UserEntity, { IUser, SearchUser } from './user.entity'
import { BaseResponse, StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'
import { AuthService } from '../auth/auth.service'
import * as argon2 from 'argon2'
import BranchEntity from '../branch/branch.entity'
import { Constant, Message } from '../common/constant'

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
    const dataList = await this.userService.findAll(query)
    const response = new StandardResponse<UserEntity>({ dataList })
    return Promise.resolve(response)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) userId: number): Promise<StandardResponse<UserEntity>> {
    const data = await this.userService.findOne(userId)
    const response = new StandardResponse<UserEntity>({ data })
    return Promise.resolve(response)
  }

  @Post()
  async create(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Body() academyData: UserEntity): Promise<BaseResponse> {
    academyData.createdId = userId
    const data = await this.userService.create(academyData)
    const response = new StandardResponse<UserEntity>({ data })
    return Promise.resolve(response)
  }

  @Patch(':id')
  async update(
    @Auth({ key: 'id', roles: ['ADMIN'] }) userId: number,
    @Param('id', new ParseIntPipe()) searchUserId: number,
    @Body() academyData: UserEntity
  ): Promise<BaseResponse> {
    academyData.updatedId = userId
    const data = await this.userService.update(searchUserId, academyData)
    const response = data ? new StandardResponse<UserEntity>({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false)
    return Promise.resolve(response)
  }

  @Delete(':id')
  async delete(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Param('id', new ParseIntPipe()) searchUserId: number): Promise<BaseResponse> {
    const data = await this.userService.delete(userId, searchUserId)
    const response = data ? new StandardResponse<UserEntity>({ data }) : new BaseResponse(Message.NOT_DELETE_DATA, Constant.DELETE_NOT_FOUND, 405, false)
    return Promise.resolve(response)
  }
}
