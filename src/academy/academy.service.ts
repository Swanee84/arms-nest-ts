import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// import { Repository, getRepository, DeleteResult } from 'typeorm'
import AcademyEntity, { SearchAcademy } from './academy.entity'
import { createQueryBuilder } from 'typeorm/index'
import { StandardResponse } from '../common/response.interface'
import { Constant } from '../common/constant'

@Injectable()
export class AcademyService {
  // constructor(
  //   @InjectRepository(AcademyEntity)
  //   private readonly academyRepository: Repository<AcademyEntity>
  // ) {}

  async findAll(query: SearchAcademy): Promise<AcademyEntity[]> {
    try {
      const dataList = await AcademyEntity.find({
        order: { id: 'ASC' },
      })
      return dataList
    } catch (err) {
      throw err
    }
  }

  async findOne(academyId: number): Promise<AcademyEntity> {
    try {
      // const data: AcademyEntity = (await createQueryBuilder('academy')
      //   .leftJoinAndSelect('AcademyEntity.branchList', 'Branch')
      //   .leftJoinAndSelect('AcademyEntity.user', 'User')
      //   .where({ id: academyId })
      //   .getOne()) as AcademyEntity
      const data: AcademyEntity = await AcademyEntity.findOne({
        where: { id: academyId },
        join: { alias: 'Academy', leftJoinAndSelect: { branch: 'Academy.branchList', user: 'Academy.user' } },
      })
      return data
    } catch (err) {
      throw err
    }
  }

  async create(data: AcademyEntity): Promise<AcademyEntity> {
    const academy = new AcademyEntity()
    Object.assign(academy, data)
    const createdData = await academy.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async update(academyId: number, data: AcademyEntity): Promise<AcademyEntity> {
    const toUpdateData = await AcademyEntity.findOne({ id: academyId })
    if (!toUpdateData) {
      return null
    }
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async delete(userId: number, academyId: number): Promise<AcademyEntity> {
    const toDeleteData = await AcademyEntity.findOne({ id: academyId })
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
