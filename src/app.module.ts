import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AcademyController } from './academy/academy.controller';
import { AcademyModule } from './academy/academy.module';
import { BranchModule } from './branch/branch.module';
import {AcademyService} from "./academy/academy.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeModule } from './code/code.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AcademyModule, BranchModule, CodeModule],
  controllers: [AppController, AcademyController],
  providers: [AppService, AcademyService],
})
export class AppModule {}
