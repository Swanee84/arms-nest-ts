import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { Connection } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AcademyController } from './academy/academy.controller'
import { AcademyModule } from './academy/academy.module'
import { BranchModule } from './branch/branch.module'
import { AcademyService } from './academy/academy.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CodeModule } from './code/code.module'
import { AuthMiddleware } from './auth/auth.middleware'

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AcademyModule, BranchModule, CodeModule],
  controllers: [AppController, AcademyController],
  providers: [AppService, AcademyService],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'api/user/signIn', method: RequestMethod.ALL }, { path: 'api/user/tokenRefresh', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
