import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'
import { CodeService } from './code.service'
import { CodeDetailEntity, CodeGroupEntity, SearchCode } from './code.entity'

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get('group')
  async findAllGroup(@Query() query: SearchCode): Promise<StandardResponse<CodeGroupEntity>> {
    return await this.codeService.findAllGroup(query.academyId ?? 1)
  }

  @Post('group')
  async createGroup(@Auth('id') userId: number, @Body('data') codeDetailData: CodeGroupEntity): Promise<CodeGroupEntity> {
    codeDetailData.createdId = userId
    const result = await this.codeService.createGroup(codeDetailData)
    return Promise.resolve(result)
  }

  @Patch('group/:groupCodeId')
  async updateGroup(@Auth('id') userId: number, @Param() params: SearchCode, @Body('data') codeDetailData: CodeGroupEntity): Promise<CodeGroupEntity> {
    codeDetailData.updatedId = userId
    const result = await this.codeService.updateGroup(params.groupCodeId, codeDetailData)
    return Promise.resolve(result)
  }

  @Delete('group/:groupCodeId')
  async deleteGroup(@Param() params: SearchCode): Promise<CodeGroupEntity> {
    const result = await this.codeService.deleteGroup(params.groupCodeId)
    return Promise.resolve(result)
  }

  @Get('detail')
  async findAllDetail(@Query() query: SearchCode): Promise<StandardResponse<CodeDetailEntity>> {
    return await this.codeService.findAllDetail(query.academyId ?? 1, query.groupCode)
  }

  @Post('detail')
  async createDetail(@Auth('id') userId: number, @Body('data') codeDetailData: CodeDetailEntity): Promise<CodeDetailEntity> {
    codeDetailData.createdId = userId
    const result = await this.codeService.createDetail(codeDetailData)
    return Promise.resolve(result)
  }

  @Patch('detail/:detailCodeId')
  async updateDetail(@Auth('id') userId: number, @Param() params: SearchCode, @Body('data') codeDetailData: CodeDetailEntity): Promise<CodeDetailEntity> {
    codeDetailData.updatedId = userId
    const result = await this.codeService.updateDetail(params.detailCodeId, codeDetailData)
    return Promise.resolve(result)
  }

  @Delete('detail/:detailCodeId')
  async deleteDetail(@Param() params: SearchCode): Promise<CodeDetailEntity> {
    const result = await this.codeService.deleteDetail(params.detailCodeId)
    return Promise.resolve(result)
  }
}
