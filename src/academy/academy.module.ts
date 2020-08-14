import { Module } from '@nestjs/common'
import { AcademyService } from './academy.service'
import { AcademyController } from './academy.controller'
import {TypeOrmModule} from "@nestjs/typeorm";
import AcademyEntity from "./academy.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AcademyEntity])],
  controllers: [AcademyController],
  providers: [AcademyService],
})
export class AcademyModule {}
