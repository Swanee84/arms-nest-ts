import { Module } from '@nestjs/common'
import { CodeController } from './code.controller'
import { CodeService } from './code.service'

@Module({
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}

/*
export class CodeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'code/group', method: RequestMethod.POST },
        { path: 'code/group/:groupCodeId', method: RequestMethod.PATCH },
        { path: 'code/group/:groupCodeId', method: RequestMethod.DELETE },
        { path: 'code/detail', method: RequestMethod.POST },
        { path: 'code/detail/:groupCodeId', method: RequestMethod.PATCH },
        { path: 'code/detail/:groupCodeId', method: RequestMethod.DELETE }
      )
  }
}
 */
