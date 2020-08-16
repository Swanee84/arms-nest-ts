import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { SECRET } from '../config'
import * as jwt from 'jsonwebtoken'

const Auth = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization
  if (token) {
    const decoded: any = jwt.verify(token, SECRET)
    return !!data ? decoded[data] : decoded.user
  }
})

export default Auth
