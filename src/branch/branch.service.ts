import { Injectable } from '@nestjs/common'
import BranchEntity, { SearchBranch } from '../branch/branch.entity'
import { StandardResponse } from '../common/response.interface'
import { createQueryBuilder } from 'typeorm/index'
import { Constant } from '../common/constant'

@Injectable()
export class BranchService {
  async findAll(query: SearchBranch): Promise<StandardResponse<BranchEntity>> {
    try {
      // const dataList: BranchEntity[] = (await createQueryBuilder('academy')
      //   .leftJoinAndSelect('BranchEntity.branchList', 'Branch')
      //   .leftJoinAndSelect('BranchEntity.user', 'User')
      //   .where(query)
      //   .getMany()) as BranchEntity[]
      const dataList = await BranchEntity.find()
      const response = new StandardResponse<BranchEntity>({ dataList })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async findOne(branchId: number): Promise<StandardResponse<BranchEntity>> {
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
      const response = new StandardResponse<BranchEntity>({ data })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async create(data: BranchEntity): Promise<BranchEntity> {
    const createdData = await data.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async update(userId: number, data: BranchEntity): Promise<BranchEntity> {
    const toUpdateData = await BranchEntity.findOne({ id: userId })
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async delete(userId: number): Promise<BranchEntity> {
    const data = new BranchEntity()
    data.id = userId
    data.status = Constant.DELETE
    const deletedData = await data.save()
    console.log('deletedData >>', deletedData)
    return deletedData
  }
}
