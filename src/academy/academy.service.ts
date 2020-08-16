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

  async findAll(query: SearchAcademy): Promise<StandardResponse<AcademyEntity>> {
    try {
      const dataList = await AcademyEntity.find({
        order: { id: 'ASC' },
      })
      const response = new StandardResponse<AcademyEntity>({ dataList })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async findOne(academyId: number): Promise<StandardResponse<AcademyEntity>> {
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
      const response = new StandardResponse<AcademyEntity>({ data })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async create(data: AcademyEntity): Promise<AcademyEntity> {
    const createdData = await data.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async update(academyId: number, data: AcademyEntity): Promise<AcademyEntity> {
    const toUpdateData = await AcademyEntity.findOne({ id: academyId })
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async delete(academyId: number): Promise<AcademyEntity> {
    const data = new AcademyEntity()
    data.id = academyId
    data.status = Constant.DELETE
    const deletedData = await data.save()
    console.log('deletedData >>', deletedData)
    return deletedData
  }
}
