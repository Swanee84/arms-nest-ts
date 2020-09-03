import { Get, Post, Body, Delete, Query, Param, Controller, Patch, ParseIntPipe } from '@nestjs/common'
import { AcademyService } from './academy.service'
import AcademyEntity, { SearchAcademy } from './academy.entity'
import { BaseResponse, StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'
import BranchEntity from '../branch/branch.entity'
import { Constant, Message } from '../common/constant'

@Controller('academy')
export class AcademyController {
  constructor(private readonly academyService: AcademyService) {}

  @Get()
  async findAll(@Query() query: SearchAcademy): Promise<StandardResponse<AcademyEntity>> {
    const dataList = await this.academyService.findAll(query)
    const response = new StandardResponse<AcademyEntity>({ dataList })
    return Promise.resolve(response)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) academyId: number): Promise<StandardResponse<AcademyEntity>> {
    const data = await this.academyService.findOne(academyId)
    const response = new StandardResponse<AcademyEntity>({ data })
    return Promise.resolve(response)
  }

  @Post()
  async create(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Body() academyData: AcademyEntity): Promise<StandardResponse<AcademyEntity>> {
    academyData.createdId = userId
    const data = await this.academyService.create(academyData)
    const response = new StandardResponse<AcademyEntity>({ data })
    return Promise.resolve(response)
  }

  @Patch(':id')
  async update(
    @Auth({ key: 'id', roles: ['ADMIN'] }) userId: number,
    @Param('id', new ParseIntPipe()) academyId: number,
    @Body() academyData: AcademyEntity
  ): Promise<BaseResponse> {
    academyData.updatedId = userId
    const data = await this.academyService.update(academyId, academyData)
    const response = data ? new StandardResponse<AcademyEntity>({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false)
    return Promise.resolve(response)
  }

  @Delete(':id')
  async delete(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Param('id', new ParseIntPipe()) academyId: number): Promise<BaseResponse> {
    const data = await this.academyService.delete(userId, academyId)
    const response = data ? new StandardResponse<AcademyEntity>({ data }) : new BaseResponse(Message.NOT_DELETE_DATA, Constant.DELETE_NOT_FOUND, 405, false)
    return Promise.resolve(response)
  }
}
