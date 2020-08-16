import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import BasicEntity, { IBasicSearch } from '../common/basic.entity'
import BranchEntity from '../branch/branch.entity'
import UserEntity from '../user/user.entity'

@Entity('academy')
export default class AcademyEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number // 학원 계정

  @Column()
  name!: string // 이름

  @Column()
  userId!: number // 학원 원장 사용자 계정

  @Column()
  address?: string // 주소

  @Column()
  corporateNo?: string // 사업자 번호

  @Column()
  phoneNo?: string // 학원 폰 번호

  @Column()
  incorporation?: string // 학원 설립일

  @OneToMany((type) => BranchEntity, (branch) => branch.academy)
  // @JoinColumn({ name: 'id', referencedColumnName: 'academy_id' })
  branchList!: BranchEntity[]

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity
}

export interface SearchAcademy extends IBasicSearch {
  id?: number
  name?: string
  userId?: number
  address?: string
  corporateNo?: string
  phoneNo?: string
  incorporation?: string
  incorporationStart?: string
  incorporationEnd?: string
}
