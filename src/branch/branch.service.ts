import { Injectable } from '@nestjs/common'
import BranchEntity, { SearchBranch } from '../branch/branch.entity'
import { StandardResponse } from '../common/response.interface'
import { createQueryBuilder } from 'typeorm/index'
import { Constant } from '../common/constant'
import AcademyEntity from '../academy/academy.entity'

@Injectable()
export class BranchService {
  async findAll(query: SearchBranch): Promise<BranchEntity[]> {
    try {
      // const dataList: BranchEntity[] = (await createQueryBuilder('academy')
      //   .leftJoinAndSelect('BranchEntity.branchList', 'Branch')
      //   .leftJoinAndSelect('BranchEntity.user', 'User')
      //   .where(query)
      //   .getMany()) as BranchEntity[]
      const dataList = await BranchEntity.find()
      return dataList
    } catch (err) {
      throw err
    }
  }

  async findOne(branchId: number): Promise<BranchEntity> {
    try {
      // const data: BranchEntity = (await createQueryBuilder('branch')
      //   .leftJoinAndSelect('BranchEntity.academy', 'Academy')
      //   .leftJoinAndSelect('BranchEntity.user', 'User')
      //   .where({ id: userId })
      //   .getOne()) as BranchEntity
      const data: BranchEntity = await BranchEntity.findOne({
        where: { id: branchId },
        join: { alias: 'Branch', leftJoinAndSelect: { academy: 'Branch.academy', user: 'Branch.user' } },
      })
      return data
    } catch (err) {
      throw err
    }
  }

  async create(data: BranchEntity): Promise<BranchEntity> {
    const branch = new BranchEntity()
    Object.assign(branch, data)
    const createdData = await branch.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async update(branchId: number, data: BranchEntity): Promise<BranchEntity> {
    const toUpdateData = await BranchEntity.findOne({ id: branchId })
    if (!toUpdateData) {
      return null
    }
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async delete(userId: number, branchId: number): Promise<BranchEntity> {
    const toDeleteData = await BranchEntity.findOne({ id: branchId })
    if (!toDeleteData) {
      return null
    }
    toDeleteData.updatedId = userId
    toDeleteData.status = Constant.DELETE
    const deletedData = await toDeleteData.save()
    console.log('deletedData >>', deletedData)
    return deletedData
  }
}
