class BaseResponse {
  message?: string
  status: number
  code?: string
  success: boolean
  constructor() {
    this.status = 200
    this.success = true
  }
}

export class StandardResponse<T> extends BaseResponse {
  result?: T
  list?: T[]

  constructor(_result?: T, _list?: T[]) {
    super()
    this.result = _result
    this.list = _list
  }
}

export class PagingResponse<T> extends BaseResponse {
  data: T[]
  total: number
  current: number
  pageSize: number

  constructor(_data: T[], _total: number, _current: number, _pageSize: number) {
    super()
    this.data = _data
    this.total = _total
    this.current = _current
    this.pageSize = _pageSize
  }
}
