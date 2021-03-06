import { Injectable } from '@nestjs/common'
import UserEntity, { IUser } from '../user/user.entity'
import { sign } from 'jsonwebtoken'
import { SECRET } from '../config'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import * as argon2 from 'argon2'
import { SignLog } from '../user/signlog.entity'
import { SignInLogModel } from '../common/logging.schema'

@Injectable()
export class AuthService {
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private readonly userRepository: Repository<UserEntity>
  // ) {}

  async signIn(email: string, password: string): Promise<IUser> {
    const user = await UserEntity.findOne({ email })
    if (!user) {
      throw new HttpException({ status: 401, message: 'Email Not Found' }, 401)
      return null
    }

    if (await argon2.verify(user.password, password)) {
      const signLog = new SignInLogModel({ userId: user.id })
      await signLog.save()
      return user.getInterface()
    } else {
      throw new HttpException({ status: 401, message: 'Invalid Password' }, 401)
    }

    return null
  }

  async findById(id: number): Promise<IUser> {
    const user = await UserEntity.findOne(id)

    if (!user) {
      const errors = { User: ' not found' }
      throw new HttpException({ errors }, 401)
    }

    return user.getInterface()
  }

  async findByIdFromRedis(id: number): Promise<IUser> {
    const user = await UserEntity.findOne(id) // redis 로 변경해야 한다.

    if (!user) {
      const errors = { User: ' not found' }
      throw new HttpException({ errors }, 401)
    }

    return user.getInterface()
  }

  public generateToken(user: IUser) {
    // const today = new Date()
    // const exp = new Date(today)
    // exp.setDate(today.getDate() + 60)
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
    try {
      const token: string = sign(payload, SECRET, { expiresIn: 60 * 60 * 24 * 2 })
      console.log('generated token : ', token)
      return token
    } catch (e) {
      console.log(e)
    }
    return null
  }
}
