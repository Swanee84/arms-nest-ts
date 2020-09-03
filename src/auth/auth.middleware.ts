import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { IUser } from '../user/user.entity'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeaders = req.headers.authorization
    const token = authHeaders
    try {
      const decoded: any = jwt.verify(token, SECRET)
      const user: IUser = decoded // await this.authService.findById(decoded.id)

      if (user) {
        req.decodedUser = user
      }
    } catch (e) {}
    next()
  }
}
