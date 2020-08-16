import { Injectable } from '@nestjs/common'
import { StandardResponse } from '../common/response.interface'
import { CodeGroupEntity, CodeDetailEntity } from './code.entity'
import { createQueryBuilder } from 'typeorm/index'
import BranchEntity from '../branch/branch.entity'
import { Constant } from '../common/constant'
import AcademyEntity from '../academy/academy.entity'

@Injectable()
export class CodeService {
  async findAllGroup(academyId: number): Promise<StandardResponse<CodeGroupEntity>> {
    try {
      const dataList: CodeGroupEntity[] = (await createQueryBuilder('code_group')
        .leftJoinAndSelect('CodeGroupEntity.detailCodeList', 'CodeDetail')
        .where({ academyId })
        .orderBy({ 'CodeGroupEntity.groupCodeName': 'ASC', 'CodeDetail.sort': 'ASC' })
        .getMany()) as CodeGroupEntity[]
      // const dataList: CodeGroupEntity[] = await CodeGroupEntity.find({
      //   where: { academyId },
      //   join: { alias: 'CodeGroup', leftJoinAndSelect: { code_detail: 'CodeGroup.detailCodeList' } },
      //   order: { groupCodeName: 'ASC' },
      // })
      const response = new StandardResponse<CodeGroupEntity>({ dataList })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async createGroup(data: CodeGroupEntity): Promise<CodeGroupEntity> {
    const createdData = await data.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async updateGroup(groupCodeId: number, data: CodeGroupEntity): Promise<CodeGroupEntity> {
    const toUpdateData = await CodeGroupEntity.findOne({ id: groupCodeId })
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async deleteGroup(groupCodeId: number): Promise<CodeGroupEntity> {
    const data = new CodeGroupEntity()
    data.id = groupCodeId
    data.status = Constant.DELETE
    const deletedData = await data.save()
    console.log('deletedData >>', deletedData)
    return deletedData
  }

  async findAllDetail(academyId: number, groupCode?: string): Promise<StandardResponse<CodeDetailEntity>> {
    try {
      const dataList: CodeDetailEntity[] = await CodeDetailEntity.find({ where: { academyId, groupCode }, order: { sort: 'ASC' } })
      const response = new StandardResponse<CodeDetailEntity>({ dataList })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async createDetail(data: CodeDetailEntity): Promise<CodeDetailEntity> {
    const createdData = await data.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async updateDetail(detailCodeId: number, data: CodeDetailEntity): Promise<CodeDetailEntity> {
    const toUpdateData = await CodeDetailEntity.findOne({ id: detailCodeId })
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async deleteDetail(detailCodeId: number): Promise<CodeDetailEntity> {
    const data = new CodeDetailEntity()
    data.id = detailCodeId
    data.status = Constant.DELETE
    const deletedData = await data.save()
    console.log('deletedData >>', deletedData)
    return deletedData
  }
}
