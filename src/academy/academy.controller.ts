import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common'
import { AcademyService } from './academy.service'
import AcademyEntity, { SearchAcademy } from './academy.entity'
import { StandardResponse } from '../common/response.interface'

@Controller('academy')
export class AcademyController {
  constructor(private readonly academyService: AcademyService) {}

  @Get()
  async findAll(@Query() query: SearchAcademy): Promise<StandardResponse<AcademyEntity>> {
    return await this.academyService.findAll(query)
  }

  @Get(':academyId')
  async findOne(@Param() params): Promise<StandardResponse<AcademyEntity>> {
    return await this.academyService.findOne(params.academyId)
  }
}
