export class Constant {
  public static readonly NORMAL: string = 'NORMAL'
  public static readonly DELETE: string = 'DELETE'
  public static readonly HIDDEN: string = 'HIDDEN'
  public static readonly SUSPEND: string = 'SUSPEND'

  public static readonly HEADER_KEY: string = 'authorization'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static returnDbErrorResponse(error: any): any {
    console.log('<--Sequelize: [Run SQL Error]-->\n' + error)
    // const response: IResponse = { result: false, message: 'SQL Error', jsonData: error }
    return null
  }
}

export class RoleConst {
  public static readonly ADMIN: string = 'ADMIN'
  public static readonly PRESIDENT: string = 'PRESIDENT'
  public static readonly DIRECTOR: string = 'DIRECTOR'
  public static readonly TEACHER: string = 'TEACHER'
  public static readonly STUDENT: string = 'STUDENT'
}
