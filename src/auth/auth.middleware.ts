import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { AuthService } from './auth.service'
import { SECRET } from '../config'
import UserEntity, { IUser } from '../user/user.entity'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeaders = req.headers.authorization
    if (authHeaders) {
      const token = authHeaders
      const decoded: any = jwt.verify(token, SECRET)
      const user: IUser = await this.authService.findById(decoded.id)

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED)
      }

      req.decodedUser = user
      next()
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED)
    }
  }
}
