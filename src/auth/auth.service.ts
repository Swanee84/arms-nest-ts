import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import UserEntity, { IUser } from '../user/user.entity'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { HttpStatus } from '@nestjs/common'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOne(email: string, password: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ email })
    if (!user) {
      return null
    }

    if (await argon2.verify(user.password, password)) {
      return user.getInterface()
    }

    return null
  }

  async findById(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      const errors = { User: ' not found' }
      throw new HttpException({ errors }, 401)
    }

    return user.getInterface()
  }

  async findByIdFromRedis(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne(id) // redis 로 변경해야 한다.

    if (!user) {
      const errors = { User: ' not found' }
      throw new HttpException({ errors }, 401)
    }

    return user.getInterface()
  }
}
