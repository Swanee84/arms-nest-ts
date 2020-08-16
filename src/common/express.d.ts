import { IUser } from '../user/user.entity'

declare global {
  namespace Express {
    interface Request {
      decodedUser?: IUser
    }
  }
}
