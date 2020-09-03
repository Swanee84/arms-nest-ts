import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { BranchService } from './branch.service'
import BranchEntity, { SearchBranch } from '../branch/branch.entity'
import { BaseResponse, StandardResponse } from '../common/response.interface'
import Auth from '../auth/auth.decorator'
import { Constant, Message } from '../common/constant'

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async findAll(@Query() query: SearchBranch): Promise<StandardResponse<BranchEntity>> {
    const dataList = await this.branchService.findAll(query)
    const response = new StandardResponse<BranchEntity>({ dataList })
    return Promise.resolve(response)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) branchId: number): Promise<StandardResponse<BranchEntity>> {
    const data = await this.branchService.findOne(branchId)
    const response = new StandardResponse<BranchEntity>({ data })
    return Promise.resolve(response)
  }

  @Post()
  async create(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Body() branchData: BranchEntity): Promise<StandardResponse<BranchEntity>> {
    branchData.createdId = userId
    const data = await this.branchService.create(branchData)
    const response = new StandardResponse<BranchEntity>({ data })
    return Promise.resolve(response)
  }

  @Patch(':id')
  async update(
    @Auth({ key: 'id', roles: ['ADMIN'] }) userId: number,
    @Param('id', new ParseIntPipe()) branchId: number,
    @Body() branchData: BranchEntity
  ): Promise<BaseResponse> {
    branchData.updatedId = userId
    const data = await this.branchService.update(branchId, branchData)
    const response = data ? new StandardResponse<BranchEntity>({ data }) : new BaseResponse(Message.NOT_UPDATE_DATA, Constant.UPDATE_NOT_FOUND, 405, false)
    return Promise.resolve(response)
  }

  @Delete(':id')
  async delete(@Auth({ key: 'id', roles: ['ADMIN'] }) userId: number, @Param('id', new ParseIntPipe()) branchId: number): Promise<BaseResponse> {
    const data = await this.branchService.delete(userId, branchId)
    const response = data ? new StandardResponse<BranchEntity>({ data }) : new BaseResponse(Message.NOT_DELETE_DATA, Constant.DELETE_NOT_FOUND, 405, false)
    return Promise.resolve(response)
  }
}
