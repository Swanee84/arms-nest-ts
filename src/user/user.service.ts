import { Injectable } from '@nestjs/common'
import UserEntity from './user.entity'
import { StandardResponse } from '../common/response.interface'
import { createQueryBuilder } from 'typeorm/index'
import { Constant } from '../common/constant'
import { SearchUser } from './user.entity'

@Injectable()
export class UserService {
  async findAll(query: SearchUser): Promise<StandardResponse<UserEntity>> {
    try {
      // const dataList: UserEntity[] = (await createQueryBuilder('academy')
      //   .leftJoinAndSelect('UserEntity.branchList', 'Branch')
      //   .leftJoinAndSelect('UserEntity.user', 'User')
      //   .where(query)
      //   .getMany()) as UserEntity[]
      const dataList = await UserEntity.find()
      const response = new StandardResponse<UserEntity>({ dataList })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async findOne(userId: number): Promise<StandardResponse<UserEntity>> {
    try {
      const data: UserEntity = await UserEntity.findOne({ id: userId })
      const response = new StandardResponse<UserEntity>({ data })
      return Promise.resolve(response)
    } catch (err) {
      throw err
    }
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const createdData = await data.save()
    console.log('createdData >>', createdData)
    return createdData
  }

  async update(userId: number, data: UserEntity): Promise<UserEntity> {
    const toUpdateData = await UserEntity.findOne({ id: userId })
    const updated = Object.assign(toUpdateData, data)
    const updatedData = await updated.save()
    console.log('updatedData >>', updatedData)
    return updatedData
  }

  async delete(userId: number): Promise<UserEntity> {
    const data = new UserEntity()
    data.id = userId
    data.status = Constant.DELETE
    const deletedData = await data.save()
    console.log('deletedData >>', deletedData)
    return deletedData
  }
}
