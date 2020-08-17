import { Get, Post, Body, Delete, Query, Param, Controller, Patch } from '@nestjs/common'
import { AcademyService } from './academy.service'
import AcademyEntity, { SearchAcademy } from './academy.entity'
import { StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'

@Controller('academy')
export class AcademyController {
  constructor(private readonly academyService: AcademyService) {}

  @Get()
  async findAll(@Query() query: SearchAcademy): Promise<StandardResponse<AcademyEntity>> {
    return await this.academyService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param() params: SearchAcademy): Promise<StandardResponse<AcademyEntity>> {
    return await this.academyService.findOne(params.id)
  }

  @Post()
  async create(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Body() academyData: AcademyEntity): Promise<AcademyEntity> {
    academyData.createdId = userId
    const result = await this.academyService.create(academyData)
    return Promise.resolve(result)
  }

  @Patch(':id')
  async update(
    @Auth({ key: 'id', roles: ['ADMIN'] }) userId: number,
    @Param() params: SearchAcademy,
    @Body() academyData: AcademyEntity
  ): Promise<AcademyEntity> {
    academyData.updatedId = userId
    const result = await this.academyService.update(params.id, academyData)
    return Promise.resolve(result)
  }

  @Delete(':id')
  async delete(@Param() params: SearchAcademy): Promise<AcademyEntity> {
    const result = await this.academyService.delete(params.id)
    return Promise.resolve(result)
  }
}
