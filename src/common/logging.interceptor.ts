import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import LoggingSchema from './logging.schema'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    const request = context.switchToHttp().getRequest()

    const method = request.method
    const url = request.route.path
    const params = request.params
    const body = request.body
    const query = request.query

    console.log(`>> ${method}: ${url}`)
    console.log('params >>', params)
    console.log('body >>', body)
    console.log('query >>', query)

    // const logging = new LoggingSchema()

    const now = Date.now()
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
  }
}
