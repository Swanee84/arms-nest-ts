import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import BasicEntity, { IBasicSearch } from '../common/basic.entity'
import AcademyEntity from '../academy/academy.entity'
import { OneToOne } from 'typeorm/index'
import UserEntity from '../user/user.entity'

@Entity('branch')
export default class BranchEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number // 지점 계정

  @Column()
  academyId!: number // 학원 계정

  @Column()
  name!: string // 이름

  @Column()
  userId!: number // 지점 원장 사용자 계정

  @Column()
  incorporation?: Date // 지점 오픈일

  @Column()
  address?: string // 주소

  @Column()
  phoneNo?: string // 학원 폰 번호

  @ManyToOne((type) => AcademyEntity, (academy) => academy.branchList)
  // @JoinColumn({ name: 'academy_id' })
  academy!: AcademyEntity

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity
}

export interface SearchBranch extends IBasicSearch {
  id?: number
  academyId?: number
  name?: string
  userId?: number
  incorporation?: string
  address?: string
  phoneNo: string
}
