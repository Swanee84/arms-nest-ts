import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { BranchService } from './branch.service'
import BranchEntity, { SearchBranch } from '../branch/branch.entity'
import { StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async findAll(@Query() query: SearchBranch): Promise<StandardResponse<BranchEntity>> {
    return await this.branchService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param() params: SearchBranch): Promise<StandardResponse<BranchEntity>> {
    return await this.branchService.findOne(params.id)
  }

  @Post()
  async create(@Auth('id') userId: number, @Body('data') academyData: BranchEntity): Promise<BranchEntity> {
    academyData.createdId = userId
    const result = await this.branchService.create(academyData)
    return Promise.resolve(result)
  }

  @Patch(':id')
  async update(@Auth('id') userId: number, @Param() params: SearchBranch, @Body('data') academyData: BranchEntity): Promise<BranchEntity> {
    academyData.updatedId = userId
    const result = await this.branchService.update(params.id, academyData)
    return Promise.resolve(result)
  }

  @Delete(':id')
  async delete(@Param() params: SearchBranch): Promise<BranchEntity> {
    const result = await this.branchService.delete(params.id)
    return Promise.resolve(result)
  }
}
