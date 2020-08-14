import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// import { Repository, getRepository, DeleteResult } from 'typeorm'
import AcademyEntity, { SearchAcademy } from './academy.entity'
import { createQueryBuilder } from 'typeorm/index'
import { StandardResponse } from '../common/response.interface'

@Injectable()
export class AcademyService {
  // constructor(
  //   @InjectRepository(AcademyEntity)
  //   private readonly academyRepository: Repository<AcademyEntity>
  // ) {}

  async findAll(query: SearchAcademy): Promise<StandardResponse<AcademyEntity>> {
    try {
      const academyList: AcademyEntity[] = (await createQueryBuilder('academy')
        .leftJoinAndSelect('AcademyEntity.branchList', 'Branch')
        .leftJoinAndSelect('AcademyEntity.user', 'User')
        .where(query)
        .getMany()) as AcademyEntity[]
      // const academyList = await AcademyEntity.find()
      const response = new StandardResponse<AcademyEntity>(null, academyList)
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async findOne(academyId: number): Promise<StandardResponse<AcademyEntity>> {
    try {
      const academy: AcademyEntity = (await createQueryBuilder('academy')
        .leftJoinAndSelect('AcademyEntity.branchList', 'Branch')
        .leftJoinAndSelect('AcademyEntity.user', 'User')
        .where({ id: academyId })
        .getOne()) as AcademyEntity
      const response = new StandardResponse<AcademyEntity>(academy, null)
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }
}
