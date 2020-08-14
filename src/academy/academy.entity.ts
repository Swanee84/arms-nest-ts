import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import BasicEntity from '../common/basic.entity'
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
  // @JoinColumn({ referencedColumnName: 'academy_id' })
  branchList!: BranchEntity[]

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity
}

export class SearchAcademy {
  id?: number
  name?: string
  userId?: number
  _address?: string
  corporateNo?: string
  phoneNo?: string
  incorporation?: string
  incorporationStart?: string
  incorporationEnd?: string

  current: number
  pageSize: number

  get address(): string {
    return `%${this._address}%`
  }
}
