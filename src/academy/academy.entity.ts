import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, Index } from 'typeorm'
import BasicEntity, { IBasicSearch } from '../common/basic.entity'
import BranchEntity from '../branch/branch.entity'
import UserEntity from '../user/user.entity'

@Entity('academy')
export default class AcademyEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '학원 계정' })
  id!: number

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '이름' })
  @Index()
  name!: string // 이름

  @Column({ type: 'int', nullable: false, comment: '학원 원장 사용자 계정' })
  @Index()
  userId!: number // 학원 원장 사용자 계정

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '주소' })
  address?: string // 주소

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '사업자 번호' })
  @Index()
  corporateNo?: string // 사업자 번호

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '학원 폰 번호' })
  @Index()
  phoneNo?: string // 학원 폰 번호

  @Column({ type: 'date', nullable: true, comment: '학원 설립일' })
  incorporation?: Date // 학원 설립일

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
